from rest_framework import serializers

from wallet.models import Wallet, Currency


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'symbol', 'bid_usd', 'icon', 'is_crypto',
                  'is_active', )


class WalletSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'public_key', 'owner', 'currency')
