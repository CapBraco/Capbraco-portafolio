from django.contrib import admin
from .models import SiteSettings

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Hero Section', {
            'fields': ('hero_title', 'hero_subtitle', 'logo_text')
        }),
        ('Fire Effect', {
            'fields': ('fire_effect_enabled', 'fire_effect_duration')
        }),
        ('About', {
            'fields': ('about_title', 'about_content', 'resume_file')
        }),
        ('Contact', {
            'fields': ('email', 'github_url', 'linkedin_url', 'twitter_url')
        }),
        ('SEO', {
            'fields': ('site_title', 'site_description')
        }),
    )
    
    def has_add_permission(self, request):
        # Only one instance allowed
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False
