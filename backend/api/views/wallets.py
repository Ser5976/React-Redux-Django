# api/views/items.py
from rest_framework import viewsets, permissions

from api.serializers import CurrencySerializer, WalletSerializer
from wallet.models import Wallet, Currency


class CurrencyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()


class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()
