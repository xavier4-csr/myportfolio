from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Profile(models.Model):
    """Main profile information"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=150)
    intro = models.TextField()
    about_journey = models.TextField()
    about_interests = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100)
    experience_years = models.CharField(max_length=20)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
    
    def __str__(self):
        return self.name
    
    def get_profile_image_url(self):
        if self.profile_image:
            return self.profile_image.url
        return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"


class TechnicalSkill(models.Model):
    """Technical skills with proficiency levels"""
    name = models.CharField(max_length=100)
    level = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Skill level from 0 to 100"
    )
    category = models.CharField(max_length=50, default='Programming')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-level', 'name']
        verbose_name = "Technical Skill"
        verbose_name_plural = "Technical Skills"
    
    def __str__(self):
        return f"{self.name} - {self.level}%"


class ProfessionalSkill(models.Model):
    """Professional/soft skills"""
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, help_text="Icon name (e.g., message-square)")
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Professional Skill"
        verbose_name_plural = "Professional Skills"
    
    def __str__(self):
        return self.name


class Technology(models.Model):
    """Technologies and tools"""
    name = models.CharField(max_length=100)
    icon_url = models.URLField(help_text="URL to technology icon")
    category = models.CharField(max_length=50, default='Frontend')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Technology"
        verbose_name_plural = "Technologies"
    
    def __str__(self):
        return self.name


class Project(models.Model):
    """Portfolio projects"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Many-to-many relationship with technologies
    technologies = models.ManyToManyField(Technology, blank=True)
    
    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title
    
    def get_image_url(self):
        if self.image:
            return self.image.url
        return f"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=360&fit=crop&seed={self.id}"


class Experience(models.Model):
    """Work experience and education"""
    EXPERIENCE_TYPES = [
        ('work', 'Work Experience'),
        ('education', 'Education'),
        ('certification', 'Certification'),
    ]
    
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    experience_type = models.CharField(max_length=20, choices=EXPERIENCE_TYPES, default='work')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-start_date']
        verbose_name = "Experience"
        verbose_name_plural = "Experience"
    
    def __str__(self):
        return f"{self.title} at {self.company}"
    
    @property
    def period(self):
        start = self.start_date.strftime("%Y")
        if self.is_current:
            return f"{start} - Present"
        elif self.end_date:
            end = self.end_date.strftime("%Y")
            return f"{start} - {end}"
        return start


class SocialLink(models.Model):
    """Social media links"""
    name = models.CharField(max_length=50)
    url = models.URLField()
    icon = models.CharField(max_length=50, help_text="Icon name (e.g., github, linkedin)")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"
    
    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    """Contact form messages"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"