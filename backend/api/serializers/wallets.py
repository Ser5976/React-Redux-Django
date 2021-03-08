from rest_framework import serializers

from wallet.models import Wallet, Currency, Transaction


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'symbol', 'bid_usd', 'icon', 'is_crypto',
                  'is_active', )


class WalletSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()
    updated = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'is_default', 'public_key', 'owner',
                  'currency', 'updated')

    def get_updated(self, obj):
        return obj.updated_at.strftime('%H:%M:%S %d-%m-%y')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'from_wallet', 'currency', 'item', 'to_wallet',
                  'amount', 'status',)

    def create(self, validated_data):
        print(self)
        print('validated_data --', validated_data)
        instance = Transaction.objects.create(**validated_data)
        return instance
