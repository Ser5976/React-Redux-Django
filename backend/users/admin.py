from django.contrib import admin
from django.contrib.auth.models import User, Group as AdminGroup
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from users.models import CustomUser


# Register your models here.
class CustomUserInline(admin.StackedInline):
    """Form for custom user."""

    model = CustomUser
    can_delete = False
    verbose_name_plural = 'additional info'


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (CustomUserInline, )
    fieldsets = (
        (None, {'fields': ('username', 'password', 'first_name',
                           'last_name')}),
        ('Permissions', {'fields': (
            'is_active', 'is_staff', 'is_superuser',
            # 'groups','user_permissions'
        )}),
        ('Important dates', {'fields': ('last_login', 'date_joined')})
    )


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.unregister(AdminGroup)
admin.site.register(User, UserAdmin)
