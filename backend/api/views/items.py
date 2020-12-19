# api/views/items.py

from rest_framework import viewsets, permissions
from api.serializers import (
    ItemSerializer, AddressSerializer, CommentSerializer
)
from todo.models import Item, Comment, Address


class ItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class AddressViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
