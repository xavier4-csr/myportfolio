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
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'github_url', 'live_url', 'is_featured']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


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