# Django
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# third-party
# from phonenumber_field.modelfields import PhoneNumberField

# local Django
from backend.mixins import DateTimeMixin
from users.managers import UserManager


class User(AbstractBaseUser, DateTimeMixin, PermissionsMixin):

    class ROLE(object):
        CONSUMER = 1
        COMPANY = 2

        ALL = [CONSUMER, COMPANY]

        CHOICES = (
            (CONSUMER, _('Consumer')),
            (COMPANY, _('Company')),
        )

    username = models.CharField(_('Username'), max_length=50, unique=True)
    first_name = models.CharField(_('First name'), max_length=50, null=True,
                                  blank=True)
    last_name = models.CharField(_('Last name'), max_length=50, null=True,
                                 blank=True)
    email = models.EmailField(
        verbose_name=_('Email address'),
        max_length=255,
        unique=True,
    )
    role = models.IntegerField(
        _('Role'),
        choices=ROLE.CHOICES,
        default=ROLE.COMPANY,
        db_index=True,
    )
    # phone_number = PhoneNumberField(_('Phone number'), max_length=20,
    #                                 null=True, blank=True)
    is_valid = models.BooleanField(_('Is valid'), default=True)
    is_active = models.BooleanField(_('Is active'), default=True)
    is_admin = models.BooleanField(_('Is admin'), default=False)
    is_staff = models.BooleanField(_('Is staff'), default=False)

    objects = UserManager()

    class Meta:
        ordering = ['-id']
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    USERNAME_FIELD = 'username'

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.username

    def __str__(self):  # __unicode__ on Python 2
        return str(self.username)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_perms(self, perm_list, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
