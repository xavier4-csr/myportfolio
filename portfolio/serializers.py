from rest_framework import serializers
from .models import (
    Profile, TechnicalSkill, ProfessionalSkill, Technology, 
    Project, Experience, SocialLink, ContactMessage
)

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for profile information"""
    profile_image_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'intro', 'about_journey', 'about_interests',
            'email', 'phone', 'location', 'experience_years', 
            'profile_image_url', 'resume_url', 'updated_at'
        ]
    
    def get_profile_image_url(self, obj):
        return obj.get_profile_image_url()
    
    def get_resume_url(self, obj):
        if obj.resume_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume_file.url)
            return obj.resume_file.url
        return None


class TechnicalSkillSerializer(serializers.ModelSerializer):
    """Serializer for technical skills"""
    class Meta:
        model = TechnicalSkill
        fields = ['id', 'name', 'level', 'category']


class ProfessionalSkillSerializer(serializers.ModelSerializer):
    """Serializer for professional skills"""
    class Meta:
        model = ProfessionalSkill
        fields = ['id', 'name', 'icon', 'description']


class TechnologySerializer(serializers.ModelSerializer):
    """Serializer for technologies"""
    class Meta:
        model = Technology
        fields = ['id', 'name', 'icon_url', 'category']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for projects"""
    technologies = TechnologySerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'image_url', 'github_url', 
            'live_url', 'is_featured', 'technologies', 'created_at'
        ]
    
    def get_image_url(self, obj):
        return obj.get_image_url()


class ProjectListSerializer(serializers.ModelSerializer):
    """Simplified serializer for project lists"""
    technologies = serializers.StringRelatedField(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'image_url', 
            'github_url', 'live_url', 'is_featured', 'technologies'
        ]
    
    def get_image_url(self, obj):
        return obj.get_image_url()


class ExperienceSerializer(serializers.ModelSerializer):
    """Serializer for experience"""
    period = serializers.ReadOnlyField()
    
    class Meta:
        model = Experience
        fields = [
            'id', 'title', 'company', 'location', 'period',
            'description', 'experience_type', 'start_date', 'end_date', 'is_current'
        ]


class SocialLinkSerializer(serializers.ModelSerializer):
    """Serializer for social links"""
    class Meta:
        model = SocialLink
        fields = ['id', 'name', 'url', 'icon']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for contact messages"""
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
    
    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)


class SkillsResponseSerializer(serializers.Serializer):
    """Combined skills response serializer"""
    technical = TechnicalSkillSerializer(many=True)
    professional = ProfessionalSkillSerializer(many=True)
    technologies = TechnologySerializer(many=True)


class ContactInfoSerializer(serializers.Serializer):
    """Contact information response serializer"""
    email = serializers.EmailField()
    phone = serializers.CharField()
    location = serializers.CharField()
    social = SocialLinkSerializer(many=True)
    resume_url = serializers.URLField(allow_null=True)