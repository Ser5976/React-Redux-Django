from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.utils import get_username_max_length
from allauth.account import app_settings as allauth_settings

from users.models import User


class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )
    role = serializers.ChoiceField(write_only=True, choices=User.ROLE.CHOICES)
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'role': self.validated_data.get('role', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user
