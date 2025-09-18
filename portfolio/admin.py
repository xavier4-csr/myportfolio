from django.contrib import admin
from .models import (
    Profile, TechnicalSkill, ProfessionalSkill, Technology,
    Project, Experience, SocialLink, ContactMessage
)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'location', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'title', 'email', 'phone', 'location', 'experience_years')
        }),
        ('About', {
            'fields': ('intro', 'about_journey', 'about_interests')
        }),
        ('Files', {
            'fields': ('profile_image', 'resume_file')
        }),
    )

@admin.register(TechnicalSkill)
class TechnicalSkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'category', 'is_active', 'order']
    list_filter = ['category', 'is_active']
    list_editable = ['level', 'is_active', 'order']
    ordering = ['order', 'name']

@admin.register(ProfessionalSkill)
class ProfessionalSkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'is_active', 'order']
    list_filter = ['is_active']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'name']

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_active', 'order']
    list_filter = ['category', 'is_active']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'name']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'is_active', 'order', 'created_at']
    list_filter = ['is_featured', 'is_active', 'technologies']
    list_editable = ['is_featured', 'is_active', 'order']
    filter_horizontal = ['technologies']
    ordering = ['-is_featured', 'order', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'image')
        }),
        ('Links', {
            'fields': ('github_url', 'live_url')
        }),
        ('Settings', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
        ('Technologies', {
            'fields': ('technologies',)
        }),
    )

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'experience_type', 'period', 'is_current', 'is_active']
    list_filter = ['experience_type', 'is_current', 'is_active']
    list_editable = ['is_active']
    ordering = ['order', '-start_date']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'company', 'location', 'experience_type')
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Description', {
            'fields': ('description',)
        }),
        ('Settings', {
            'fields': ('is_active', 'order')
        }),
    )

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'is_active', 'order']
    list_filter = ['is_active']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'name']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'is_replied', 'created_at']
    list_filter = ['is_read', 'is_replied', 'created_at']
    list_editable = ['is_read', 'is_replied']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    
    def has_add_permission(self, request):
        return False  # Don't allow adding messages through admin