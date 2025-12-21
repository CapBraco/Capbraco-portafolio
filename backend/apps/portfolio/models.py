from django.db import models
from django.utils.text import slugify
from django.urls import reverse

class Project(models.Model):
    """Portfolio projects"""
    
    CATEGORY_CHOICES = [
        ('flagship', 'Flagship Project'),
        ('web', 'Web Development'),
        ('3d', '3D Modeling & Animation'),
        ('experiment', 'Experiment'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('featured', 'Featured'),
    ]
    
    # Basic Info
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )
    
    # Content
    short_description = models.TextField(max_length=300)
    full_description = models.TextField()
    
    # Case Study (optional)
    challenge = models.TextField(
        blank=True,
        help_text="What was the problem?"
    )
    solution = models.TextField(
        blank=True,
        help_text="How did you solve it?"
    )
    outcome = models.TextField(
        blank=True,
        help_text="What was the result?"
    )
    
    # Media
    hero_image = models.ImageField(upload_to='projects/heroes/')
    demo_video = models.URLField(blank=True)
    
    # Technical
    tech_stack = models.JSONField(
        default=list,
        help_text="List of technologies used"
    )
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    
    # SEO
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Organization
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-display_order', '-published_at']
        indexes = [
            models.Index(fields=['-published_at']),
            models.Index(fields=['status', '-display_order']),
        ]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_description:
            self.meta_description = self.short_description[:160]
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('portfolio:project_detail', kwargs={'slug': self.slug})
    
    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    """Additional images for project galleries"""
    project = models.ForeignKey(
        Project,
        related_name='images',
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.project.title} - Image {self.order}"
