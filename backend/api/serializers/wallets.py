from collections.abc import Mapping
from collections import OrderedDict

from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework.exceptions import ValidationError
from rest_framework.settings import api_settings
from rest_framework import serializers
from rest_framework.fields import get_error_detail, SkipField, set_value, empty

from wallet.models import Wallet, Currency, Transaction


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'symbol', 'bid_usd', 'icon', 'is_crypto',
                  'is_active', )

    def create(self, validated_data):
        instance = Currency.objects.create(**validated_data)
        return instance


class WalletSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()
    updated = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'is_default', 'public_key', 'owner',
                  'currency', 'updated')

    def to_internal_value(self, data):
        """
        Dict of native values <- Dict of primitive datatypes.
        """
        if not isinstance(data, Mapping):
            message = self.error_messages['invalid'].format(
                datatype=type(data).__name__
            )
            raise ValidationError({
                api_settings.NON_FIELD_ERRORS_KEY: [message]
            }, code='invalid')

        ret = OrderedDict()
        errors = OrderedDict()
        fields = self._writable_fields

        for field in fields:
            validate_method = getattr(self, 'validate_' + field.field_name, None)
            primitive_value = field.get_value(data)
            try:
                if field.field_name == 'currency' and primitive_value is not empty:
                    symbol = primitive_value['symbol']
                    validated_value = Currency.objects.get(symbol=symbol)
                else:
                    validated_value = field.run_validation(primitive_value)
                if validate_method is not None:
                    validated_value = validate_method(validated_value)
            except ValidationError as exc:
                errors[field.field_name] = exc.detail
            except DjangoValidationError as exc:
                errors[field.field_name] = get_error_detail(exc)
            except SkipField:
                pass
            else:
                set_value(ret, field.source_attrs, validated_value)

        if errors:
            raise ValidationError(errors)

        return ret

    def get_updated(self, obj):
        return obj.updated_at.strftime('%H:%M:%S %d-%m-%y')

    def create(self, validated_data):
        instance = Wallet.objects.create(**validated_data)
        return instance


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'from_wallet', 'current_exchange', 'item', 'to_wallet',
                  'amount', 'status',)

    def create(self, validated_data):
        instance = Transaction.objects.create(**validated_data)
        return instance
