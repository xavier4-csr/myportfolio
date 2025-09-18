from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import (
    Profile, TechnicalSkill, ProfessionalSkill, Technology,
    Project, Experience, SocialLink, ContactMessage
)
from .serializers import (
    ProfileSerializer, SkillsResponseSerializer, ProjectSerializer,
    ProjectListSerializer, ExperienceSerializer, ContactInfoSerializer,
    ContactMessageSerializer
)

class ProfileView(generics.RetrieveAPIView):
    """Get profile information"""
    serializer_class = ProfileSerializer
    
    def get_object(self):
        # Get the first (and hopefully only) profile
        profile = Profile.objects.first()
        if not profile:
            # Create a default profile if none exists
            profile = Profile.objects.create(
                name="Your Name",
                title="Full Stack Developer",
                intro="Building digital experiences that matter. Passionate about solving problems through code.",
                about_journey="I began my coding journey when I discovered my passion for building things with code.",
                about_interests="When I'm not coding, you'll find me exploring new technologies.",
                email="your.email@example.com",
                location="City, Country",
                experience_years="3+ Years"
            )
        return profile


@api_view(['GET'])
def skills_view(request):
    """Get all skills data"""
    technical_skills = TechnicalSkill.objects.filter(is_active=True)
    professional_skills = ProfessionalSkill.objects.filter(is_active=True)
    technologies = Technology.objects.filter(is_active=True)
    
    # If no skills exist, create some defaults
    if not technical_skills.exists():
        default_technical = [
            {'name': 'JavaScript', 'level': 90, 'category': 'Programming'},
            {'name': 'React', 'level': 85, 'category': 'Frontend'},
            {'name': 'Python', 'level': 80, 'category': 'Programming'},
            {'name': 'Django', 'level': 75, 'category': 'Backend'},
            {'name': 'PostgreSQL', 'level': 70, 'category': 'Database'},
        ]
        for skill_data in default_technical:
            TechnicalSkill.objects.create(**skill_data)
        technical_skills = TechnicalSkill.objects.filter(is_active=True)
    
    if not professional_skills.exists():
        default_professional = [
            {'name': 'Communication', 'icon': 'message-square'},
            {'name': 'Time Management', 'icon': 'clock'},
            {'name': 'Teamwork', 'icon': 'users'},
            {'name': 'Problem Solving', 'icon': 'target'},
        ]
        for skill_data in default_professional:
            ProfessionalSkill.objects.create(**skill_data)
        professional_skills = ProfessionalSkill.objects.filter(is_active=True)
    
    if not technologies.exists():
        default_technologies = [
            {'name': 'React', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
            {'name': 'Python', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
            {'name': 'Django', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'},
            {'name': 'JavaScript', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
            {'name': 'PostgreSQL', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'},
            {'name': 'Git', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'},
        ]
        for tech_data in default_technologies:
            Technology.objects.create(**tech_data)
        technologies = Technology.objects.filter(is_active=True)
    
    response_data = {
        'technical': [{'name': skill.name, 'level': skill.level} for skill in technical_skills],
        'professional': [{'name': skill.name, 'icon': skill.icon} for skill in professional_skills],
        'technologies': [{'name': tech.name, 'icon': tech.icon_url} for tech in technologies]
    }
    
    return Response(response_data)


class ProjectListView(generics.ListAPIView):
    """Get list of projects"""
    serializer_class = ProjectListSerializer
    
    def get_queryset(self):
        queryset = Project.objects.filter(is_active=True)
        
        # Filter by featured projects if requested
        featured_only = self.request.query_params.get('featured', None)
        if featured_only == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Limit results if requested
        limit = self.request.query_params.get('limit', None)
        if limit:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
            except ValueError:
                pass
        
        # If no projects exist, create some defaults
        if not queryset.exists() and not Project.objects.exists():
            self.create_default_projects()
            queryset = Project.objects.filter(is_active=True)
        
        return queryset
    
    def create_default_projects(self):
        """Create default projects if none exist"""
        default_projects = [
            {
                'title': 'E-commerce Platform',
                'description': 'A full-featured e-commerce platform with payment integration and admin dashboard.',
                'github_url': 'https://github.com/yourusername/ecommerce-platform',
                'live_url': 'https://your-ecommerce-demo.com',
                'is_featured': True,
            },
            {
                'title': 'Task Management App',
                'description': 'A collaborative task management application with real-time updates.',
                'github_url': 'https://github.com/yourusername/task-manager',
                'live_url': 'https://your-task-app.com',
                'is_featured': True,
            },
            {
                'title': 'Portfolio Website',
                'description': 'A responsive portfolio website showcasing my work and skills.',
                'github_url': 'https://github.com/yourusername/portfolio',
                'live_url': 'https://your-portfolio.com',
                'is_featured': True,
            }
        ]
        
        for project_data in default_projects:
            Project.objects.create(**project_data)


class ProjectDetailView(generics.RetrieveAPIView):
    """Get detailed project information"""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer


class ExperienceListView(generics.ListAPIView):
    """Get list of experience and education"""
    serializer_class = ExperienceSerializer
    
    def get_queryset(self):
        queryset = Experience.objects.filter(is_active=True)
        
        # Filter by experience type if requested
        exp_type = self.request.query_params.get('type', None)
        if exp_type:
            queryset = queryset.filter(experience_type=exp_type)
        
        # If no experience exists, create some defaults
        if not queryset.exists() and not Experience.objects.exists():
            self.create_default_experience()
            queryset = Experience.objects.filter(is_active=True)
        
        return queryset
    
    def create_default_experience(self):
        """Create default experience if none exists"""
        from datetime import date
        
        default_experience = [
            {
                'title': 'Senior Developer',
                'company': 'Tech Company Inc.',
                'start_date': date(2020, 1, 1),
                'is_current': True,
                'description': 'Led a team of developers in building scalable web applications. Implemented CI/CD pipelines and mentored junior developers.',
                'experience_type': 'work',
            },
            {
                'title': 'Frontend Developer',
                'company': 'Digital Agency',
                'start_date': date(2018, 1, 1),
                'end_date': date(2020, 12, 31),
                'description': 'Developed responsive web applications using React and Vue.js. Collaborated with designers to implement UI/UX best practices.',
                'experience_type': 'work',
            },
            {
                'title': 'Computer Science Degree',
                'company': 'University Name',
                'start_date': date(2014, 9, 1),
                'end_date': date(2018, 6, 30),
                'description': 'Specialized in software engineering and web development. Completed coursework in algorithms, databases, and human-computer interaction.',
                'experience_type': 'education',
            }
        ]
        
        for exp_data in default_experience:
            Experience.objects.create(**exp_data)


@api_view(['GET'])
def contact_info_view(request):
    """Get contact information"""
    profile = Profile.objects.first()
    social_links = SocialLink.objects.filter(is_active=True)
    
    # Create default social links if none exist
    if not social_links.exists():
        default_social = [
            {'name': 'GitHub', 'url': 'https://github.com/yourusername', 'icon': 'github'},
            {'name': 'LinkedIn', 'url': 'https://linkedin.com/in/yourusername', 'icon': 'linkedin'},
            {'name': 'Twitter', 'url': 'https://twitter.com/yourusername', 'icon': 'twitter'},
            {'name': 'Instagram', 'url': 'https://instagram.com/yourusername', 'icon': 'instagram'},
        ]
        for social_data in default_social:
            SocialLink.objects.create(**social_data)
        social_links = SocialLink.objects.filter(is_active=True)
    
    if not profile:
        # Create default profile if none exists
        profile = Profile.objects.create(
            name="Your Name",
            email="your.email@example.com",
            phone="+1 (234) 567-890",
            location="City, Country"
        )
    
    response_data = {
        'email': profile.email,
        'phone': profile.phone or "+1 (234) 567-890",
        'location': profile.location,
        'social': [{'name': link.name, 'url': link.url, 'icon': link.icon} for link in social_links],
        'resume_url': profile.resume_file.url if profile.resume_file else None
    }
    
    return Response(response_data)


@api_view(['POST'])
def send_message_view(request):
    """Handle contact form submission"""
    serializer = ContactMessageSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the message to database
        message = serializer.save()
        
        # Send email notification (optional)
        try:
            subject = f"Portfolio Contact: {message.subject}"
            email_message = f"""
            New message from your portfolio:
            
            Name: {message.name}
            Email: {message.email}
            Subject: {message.subject}
            
            Message:
            {message.message}
            """
            
            send_mail(
                subject,
                email_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")
        
        return Response(
            {'message': 'Message sent successfully!', 'id': message.id},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        {'errors': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )