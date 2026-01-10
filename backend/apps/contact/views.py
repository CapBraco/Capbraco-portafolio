# backend/apps/contact/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .serializers import ContactSerializer
import logging

logger = logging.getLogger(__name__)

# Rate limit: 3 submissions per hour per IP
@method_decorator(ratelimit(key='ip', rate='3/h', method='POST'), name='dispatch')
class ContactView(APIView):
    def post(self, request):
        # Check if rate limited
        if getattr(request, 'limited', False):
            logger.warning(f"Rate limit exceeded for IP: {request.META.get('REMOTE_ADDR')}")
            return Response(
                {'error': 'Too many requests. Please try again later.'},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )
        
        logger.info(f"Received contact form data: {request.data}")
        
        serializer = ContactSerializer(data=request.data)
        
        if not serializer.is_valid():
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        message = serializer.validated_data['message']
        
        # Check for honeypot (bot trap)
        honeypot = request.data.get('website', '')
        if honeypot:
            logger.warning(f"Honeypot triggered! Bot detected from: {email}")
            # Return success to fool the bot
            return Response(
                {'message': 'Message sent successfully!'}, 
                status=status.HTTP_200_OK
            )
        
        # Basic spam detection
        spam_keywords = ['viagra', 'casino', 'lottery', 'bitcoin', 'crypto', 'forex']
        message_lower = message.lower()
        if any(keyword in message_lower for keyword in spam_keywords):
            logger.warning(f"Spam keywords detected from: {email}")
            return Response(
                {'error': 'Message contains prohibited content.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check message length
        if len(message) < 10:
            return Response(
                {'error': 'Message is too short. Please provide more details.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(message) > 5000:
            return Response(
                {'error': 'Message is too long. Please keep it under 5000 characters.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            email_subject = f'Portfolio Contact from {name}'
            email_body = f'''
New contact form submission from capbraco.com:

From: {name}
Email: {email}
IP Address: {request.META.get('REMOTE_ADDR', 'Unknown')}

Message:
{message}

---
Sent from CapBraco Portfolio Contact Form
'''
            logger.info(f"Attempting to send email from {email} to {settings.EMAIL_HOST_USER}")
            
            result = send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            
            logger.info(f"Email sent successfully! Result: {result}")
            
            return Response(
                {'message': 'Message sent successfully!'}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"Email send failed: {type(e).__name__}: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            
            return Response(
                {'error': 'Failed to send email. Please try again later.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )