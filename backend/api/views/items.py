# api/views/items.py

from rest_framework import viewsets, permissions
from api.serializers import ItemSerializer
from todo.models import Item


class ItemViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
