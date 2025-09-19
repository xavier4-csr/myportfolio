from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('skills/', views.skills_view, name='skills'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('experience/', views.ExperienceListView.as_view(), name='experience'),
    path('contact/', views.contact_info_view, name='contact-info'),
    path('contact/send/', views.send_message_view, name='send-message'),
]