from django.contrib import admin
from .models import Project, ProjectImage

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3
    fields = ('image', 'caption', 'order')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'display_order', 'published_at')
    list_filter = ('category', 'status', 'created_at')
    search_fields = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectImageInline]
    date_hierarchy = 'published_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'status')
        }),
        ('Content', {
            'fields': ('short_description', 'full_description', 'hero_image')
        }),
        ('Case Study', {
            'fields': ('challenge', 'solution', 'outcome'),
            'classes': ('collapse',)
        }),
        ('Technical Details', {
            'fields': ('tech_stack', 'github_url', 'live_url', 'demo_video')
        }),
        ('SEO', {
            'fields': ('meta_description',),
            'classes': ('collapse',)
        }),
        ('Organization', {
            'fields': ('display_order', 'published_at')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        from django.utils import timezone
        if obj.status == 'published' and not obj.published_at:
            obj.published_at = timezone.now()
        super().save_model(request, obj, form, change)

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'caption', 'order')
    list_filter = ('project',)
