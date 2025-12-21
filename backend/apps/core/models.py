from django.db import models

class SiteSettings(models.Model):
    """Singleton model for site-wide settings"""
    
    # Hero Section
    hero_title = models.CharField(max_length=200, default="Cap Braco")
    hero_subtitle = models.TextField(default="Let's work together.")
    logo_text = models.CharField(max_length=50, default="CAPBRACO")
    
    # Fire Effect
    fire_effect_enabled = models.BooleanField(default=True)
    fire_effect_duration = models.IntegerField(
        default=8000,
        help_text="Duration in milliseconds"
    )
    
    # About
    about_title = models.CharField(max_length=200, default="About Me")
    about_content = models.TextField(blank=True)
    resume_file = models.FileField(
        upload_to='documents/',
        blank=True,
        help_text="PDF resume"
    )
    
    # Contact
    email = models.EmailField(default="dev@capbraco.com")
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    # SEO
    site_title = models.CharField(max_length=100, default="CapBraco")
    site_description = models.TextField(
        default="Portfolio & Development Hub"
    )
    
    class Meta:
        verbose_name_plural = "Site Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists (Singleton pattern)
        self.pk = 1
        super().save(*args, **kwargs)
    
    @classmethod
    def load(cls):
        """Load the singleton instance"""
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
    
    def __str__(self):
        return "Site Settings"
