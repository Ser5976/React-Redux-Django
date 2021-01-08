"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework.documentation import include_docs_urls

from .social import FacebookLogin, GithubLogin
from .auth import CustomLoginView


doc_title = 'Django React API'
doc_description = 'Django React API description'

schema_view = get_schema_view(
    openapi.Info(
        title=doc_title,
        default_version='v1',
        description=doc_description,
    ),
    validators=['ssv'],
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    re_path(
        r'^swagger(?P<format>.json|.yaml)$',
        schema_view.without_ui(cache_timeout=None),
        name='schema-json'
    ),
    path(
        'swagger/',
        schema_view.with_ui('swagger', cache_timeout=None),
        name='schema-swagger-ui'
    ),
    path(
        'docs/',
        include_docs_urls(
            title=doc_title,
        )
    ),
    path('api/', include('api.urls'), name='api'),
    path('admin/', admin.site.urls),
    path('silk/', include('silk.urls', namespace='silk')),
    path('dj-rest-auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('dj-rest-auth/github/', GithubLogin.as_view(), name='github_login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
