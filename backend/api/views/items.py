# api/views/items.py

from rest_framework import viewsets, permissions
from api.serializers import (
    ItemSerializer, AddressSerializer, CommentSerializer
)
from todo.models import Item, Comment, Address
from users.models import User


class ItemViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = ItemSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        queryset = Item.objects.order_by('-created_at')
        filter_param = self.request.query_params.get('filter')
        if filter_param is not None and filter_param == 'auth':
            user_id = self.request.query_params.get('user')
            user = User.objects.get(id=user_id)
            queryset = queryset.filter(owner=user)

        return queryset

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AddressViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
