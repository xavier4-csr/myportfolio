from rest_framework import serializers
from .models import (
    Profile, TechnicalSkill, ProfessionalSkill, Technology,
    Project, Experience, SocialLink, ContactMessage
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    technologies = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'


class ProjectListSerializer(serializers.ModelSerializer):
    technologies = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'github_url', 'live_url', 'is_featured', 'technologies']


class ExperienceSerializer(serializers.ModelSerializer):
    period = serializers.SerializerMethodField()
    
    class Meta:
        model = Experience
        fields = '__all__'
    
    def get_period(self, obj):
        from datetime import date
        if obj.is_current:
            return f"{obj.start_date.strftime('%Y')} - Present"
        elif obj.end_date:
            return f"{obj.start_date.strftime('%Y')} - {obj.end_date.strftime('%Y')}"
        else:
            return f"{obj.start_date.strftime('%Y')}"


class ContactInfoSerializer(serializers.Serializer):
    email = serializers.EmailField()
    phone = serializers.CharField()
    location = serializers.CharField()
    social = serializers.ListField()
    resume_url = serializers.URLField(required=False)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']


class SkillsResponseSerializer(serializers.Serializer):
    technical = serializers.ListField()
    professional = serializers.ListField()
    technologies = serializers.ListField()