"""
WSGI config for myportfolio project.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myportfolio.settings')

application = get_wsgi_application()



