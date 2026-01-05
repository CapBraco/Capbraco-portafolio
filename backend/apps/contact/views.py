from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactSerializer

class ContactView(APIView):
    """
    API endpoint for contact form submissions
    """
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        
        if serializer.is_valid():
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            message = serializer.validated_data['message']
            
            # Email subject and body
            subject = f'Portfolio Contact: {name}'
            email_message = f"""
New contact from capbraco.com:

Name: {name}
Email: {email}

Message:
{message}

---
Sent from CapBraco Portfolio Contact Form
            """
            
            try:
                # Send email
                send_mail(
                    subject=subject,
                    message=email_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=['bracosmo@gmail.com'],
                    fail_silently=False,
                )
                
                return Response(
                    {'message': 'Message sent successfully!'},
                    status=status.HTTP_200_OK
                )
                
            except Exception as e:
                return Response(
                    {'message': f'Failed to send email: {str(e)}'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
