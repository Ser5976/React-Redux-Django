# todo/serializers.py

from collections.abc import Mapping
from collections import OrderedDict

from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework.exceptions import ValidationError
from rest_framework.settings import api_settings
from rest_framework import serializers
from rest_framework.fields import get_error_detail, SkipField, set_value, empty

from todo.models import Item
from users.models import User


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'owner', 'title', 'description', 'created_at',
                  'updated_at')

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
        print('data ', data)
        for field in fields:
            print('field ', field)
            validate_method = getattr(self, 'validate_' + field.field_name,
                                      None)
            primitive_value = field.get_value(data)
            try:
                if field.field_name == 'owner' and primitive_value == empty:
                    validated_value = User.objects.get(is_admin=True)
                else:
                    validated_value = field.run_validation(primitive_value)
                    if validate_method is not None:
                        validated_value = validate_method(validated_value)
                print('validated_value ', validated_value)
            except ValidationError as exc:
                print('ValidationError')
                errors[field.field_name] = exc.detail
            except DjangoValidationError as exc:
                errors[field.field_name] = get_error_detail(exc)
            except SkipField:
                pass
            else:
                set_value(ret, field.source_attrs, validated_value)

        if errors:
            print('errors ', errors)
            raise ValidationError(errors)

        return ret
