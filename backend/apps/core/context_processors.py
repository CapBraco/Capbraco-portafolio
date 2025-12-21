from .models import SiteSettings
from django.conf import settings

def site_settings(request):
    return {'site_settings': SiteSettings.load()}

def analytics(request):
    return {'GOOGLE_ANALYTICS_ID': settings.GOOGLE_ANALYTICS_ID}
