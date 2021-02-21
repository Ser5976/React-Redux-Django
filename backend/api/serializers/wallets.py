from rest_framework import serializers

from wallet.models import Wallet, Currency, Transaction


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'symbol', 'bid_usd', 'icon', 'is_crypto',
                  'is_active', )


class WalletSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'is_default', 'public_key', 'owner',
                  'currency')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'from_wallet', 'to_wallet', 'amount', 'status',)
