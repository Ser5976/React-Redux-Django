# api/views/users.py

from rest_framework import viewsets, permissions
from api.serializers import UserSerializer
from users.models import User


class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()
