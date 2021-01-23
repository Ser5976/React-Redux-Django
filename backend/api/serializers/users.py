from collections.abc import Mapping
from collections import OrderedDict

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.settings import api_settings
from rest_framework.fields import get_error_detail, SkipField, set_value

from django.core.exceptions import ValidationError as DjangoValidationError

from users.models import User
from .wallets import WalletSerializer


class UserSerializer(serializers.ModelSerializer):
    wallets = WalletSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'role',
                  'avatar', 'is_admin', 'wallets', 'created_at',)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

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
        # print('data ', data)

        for field in fields:
            validate_method = getattr(self, 'validate_' + field.field_name, None)
            primitive_value = field.get_value(data)
            # print('primitive_value ', primitive_value)
            try:
                validated_value = field.run_validation(primitive_value)
                # print('validated_value ', validated_value)
                if validate_method is not None:
                    validated_value = validate_method(validated_value)
            except ValidationError as exc:
                # print('ValidationError ', exc)
                errors[field.field_name] = exc.detail
            except DjangoValidationError as exc:
                # print('DjangoValidationError ', exc)
                errors[field.field_name] = get_error_detail(exc)
            except SkipField:
                # print('SkipField')
                pass
            else:
                set_value(ret, field.source_attrs, validated_value)

        if errors:
            raise ValidationError(errors)

        return ret
