# api/views/items.py

from rest_framework import viewsets
from api.serializers import ItemSerializer
from todo.models import Item


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
