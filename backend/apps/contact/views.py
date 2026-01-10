# backend/apps/contact/views.py - WITH SPAM PROTECTION
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

# Rate limit: 3 submissions per hour per IP address
@method_decorator(ratelimit(key='ip', rate='3/h', method='POST', block=True), name='dispatch')
class ContactView(APIView):
    def post(self, request):
        # Check if rate limited
        if getattr(request, 'limited', False):
            logger.warning(f"Rate limit exceeded for IP: {self.get_client_ip(request)}")
            return Response(
                {'error': 'Too many requests. Please try again in an hour.'},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )
        
        logger.info(f"Received contact form from IP: {self.get_client_ip(request)}")
        
        serializer = ContactSerializer(data=request.data)
        
        if not serializer.is_valid():
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        message = serializer.validated_data['message']
        
        # HONEYPOT CHECK - If 'website' field is filled, it's a bot
        honeypot = request.data.get('website', '')
        if honeypot:
            logger.warning(f"🤖 Honeypot triggered! Bot detected from {email} (IP: {self.get_client_ip(request)})")
            # Return success to fool the bot, but don't send email
            return Response(
                {'message': 'Message sent successfully!'}, 
                status=status.HTTP_200_OK
            )
        
        # SPAM KEYWORD DETECTION
        spam_keywords = [
            'viagra', 'casino', 'lottery', 'bitcoin', 'crypto', 'forex',
            'seo service', 'link building', 'payday loan', 'get rich',
            'make money fast', 'click here', 'buy now', 'limited offer',
        ]
        message_lower = message.lower()
        name_lower = name.lower()
        
        for keyword in spam_keywords:
            if keyword in message_lower or keyword in name_lower:
                logger.warning(f"🚫 Spam keywords detected from {email}: '{keyword}'")
                return Response(
                    {'error': 'Message contains prohibited content.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # MESSAGE LENGTH VALIDATION
        if len(message) < 10:
            return Response(
                {'error': 'Message is too short. Please provide at least 10 characters.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(message) > 5000:
            return Response(
                {'error': 'Message is too long. Please keep it under 5000 characters.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # NAME VALIDATION - Prevent garbage names
        if len(name) < 2 or len(name) > 100:
            return Response(
                {'error': 'Please provide a valid name.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # CHECK FOR SUSPICIOUS PATTERNS
        # Too many links in message
        if message.count('http') > 2:
            logger.warning(f"🔗 Too many links from {email}")
            return Response(
                {'error': 'Please remove excessive links from your message.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # All caps (common spam indicator)
        if len(message) > 50 and message.isupper():
            logger.warning(f"📢 All caps message from {email}")
            return Response(
                {'error': 'Please don\'t use all capital letters.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            client_ip = self.get_client_ip(request)
            user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
            
            email_subject = f'Portfolio Contact from {name}'
            email_body = f'''
New contact form submission from capbraco.com:

From: {name}
Email: {email}
IP Address: {client_ip}
User Agent: {user_agent}

Message:
{message}

---
Sent from CapBraco Portfolio Contact Form
'''
            logger.info(f"✉️ Sending email from {email} to {settings.EMAIL_HOST_USER}")
            
            result = send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            
            logger.info(f"✅ Email sent successfully! Result: {result}")
            
            return Response(
                {'message': 'Message sent successfully!'}, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"❌ Email send failed: {type(e).__name__}: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            
            return Response(
                {'error': 'Failed to send email. Please try again later.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def get_client_ip(self, request):
        """Get the client's IP address from the request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
