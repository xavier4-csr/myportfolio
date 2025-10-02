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
        profile = Profile.objects.first()
        if not profile:
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

    def put(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def skills_view(request):
    """Get all skills data"""
    if request.method == 'GET':
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

        # Create defaults for professional skills if none exist
        if not professional_skills.exists():
            default_professional = [
                {'name': 'Communication', 'icon': 'message-square', 'description': 'Effective verbal and written communication skills'},
                {'name': 'Teamwork', 'icon': 'users', 'description': 'Collaborative team player with strong interpersonal skills'},
                {'name': 'Problem Solving', 'icon': 'brain', 'description': 'Analytical thinking and creative problem resolution'},
                {'name': 'Time Management', 'icon': 'clock', 'description': 'Efficient task prioritization and deadline management'},
            ]
            for skill_data in default_professional:
                ProfessionalSkill.objects.create(**skill_data)
            professional_skills = ProfessionalSkill.objects.filter(is_active=True)

        # Create defaults for technologies if none exist
        if not technologies.exists():
            default_technologies = [
                {'name': 'React', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'category': 'Frontend'},
                {'name': 'Django', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', 'category': 'Backend'},
                {'name': 'Python', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'category': 'Programming'},
                {'name': 'JavaScript', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'category': 'Programming'},
                {'name': 'PostgreSQL', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'category': 'Database'},
                {'name': 'Git', 'icon_url': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'category': 'Tools'},
            ]
            for tech_data in default_technologies:
                Technology.objects.create(**tech_data)
            technologies = Technology.objects.filter(is_active=True)

        # Serialize the data
        technical_data = [{'name': skill.name, 'level': skill.level, 'category': skill.category} for skill in technical_skills]
        professional_data = [{'name': skill.name, 'icon': skill.icon, 'description': skill.description} for skill in professional_skills]
        technologies_data = [{'name': tech.name, 'icon': tech.icon_url, 'category': tech.category} for tech in technologies]

        response_data = {
            'technical': technical_data,
            'professional': professional_data,
            'technologies': technologies_data
        }
        return Response(response_data)

    elif request.method == 'PUT':
        data = request.data
        if 'technical' in data:
            TechnicalSkill.objects.all().delete()
            for skill in data['technical']:
                TechnicalSkill.objects.create(**skill)
        if 'professional' in data:
            ProfessionalSkill.objects.all().delete()
            for skill in data['professional']:
                ProfessionalSkill.objects.create(**skill)
        if 'technologies' in data:
            Technology.objects.all().delete()
            for tech in data['technologies']:
                Technology.objects.create(**tech)
        return Response({'message': 'Skills updated successfully'})
class ProjectListView(generics.ListAPIView):
    """Get list of projects and allow updates"""
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        queryset = Project.objects.filter(is_active=True)
        featured_only = self.request.query_params.get('featured', None)
        if featured_only == 'true':
            queryset = queryset.filter(is_featured=True)
        limit = self.request.query_params.get('limit', None)
        if limit:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
            except ValueError:
                pass
        if not queryset.exists() and not Project.objects.exists():
            self.create_default_projects()
            queryset = Project.objects.filter(is_active=True)
        return queryset

    def create_default_projects(self):
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

    def put(self, request, *args, **kwargs):
        Project.objects.all().delete()
        projects = request.data.get('projects', [])
        if isinstance(projects, str):
            import json
            try:
                projects = json.loads(projects)
            except Exception:
                projects = [projects]
        for proj in projects:
            if isinstance(proj, dict):
                Project.objects.create(**proj)
            else:
                Project.objects.create(title=str(proj))
        return Response({'message': 'Projects updated successfully'})


class ProjectDetailView(generics.RetrieveAPIView):
    """Get detailed project information"""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer


class ExperienceListView(generics.ListAPIView):
    def put(self, request, *args, **kwargs):
        # Update experience
        Experience.objects.all().delete()
        experience = request.data.get('experience', [])
        if isinstance(experience, str):
            import json
            try:
                experience = json.loads(experience)
            except Exception:
                experience = [experience]
        for exp in experience:
            if isinstance(exp, dict):
                Experience.objects.create(**exp)
            else:
                Experience.objects.create(title=str(exp))
        return Response({'message': 'Experience updated successfully'})
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
        """Create default experience if none exist"""
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


@api_view(['GET', 'PUT'])
def contact_info_view(request):
    """Get contact information"""
    if request.method == 'GET':
        profile = Profile.objects.first()
        social_links = SocialLink.objects.filter(is_active=True)
        # ...existing code...
        response_data = {
            'email': profile.email,
            'phone': profile.phone or "+1 (234) 567-890",
            'location': profile.location,
            'social': [{'name': link.name, 'url': link.url, 'icon': link.icon} for link in social_links],
            'resume_url': profile.resume_file.url if profile.resume_file else None
        }
        return Response(response_data)
    elif request.method == 'PUT':
        data = request.data
        profile = Profile.objects.first()
        if profile:
            profile.email = data.get('email', profile.email)
            profile.phone = data.get('phone', profile.phone)
            profile.location = data.get('location', profile.location)
            profile.save()
        if 'social' in data:
            SocialLink.objects.all().delete()
            for link in data['social']:
                SocialLink.objects.create(**link)
        return Response({'message': 'Contact info updated successfully'})


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
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")
            return Response(
                {'error': f"Failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        return Response(
            {'message': 'Message sent successfully!', 'id': message.id},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        {'errors': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )