# Django
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User

# third-party
# from phonenumber_field.modelfields import PhoneNumberField

# local Django
from backend.mixins import DateTimeMixin


class CustomUser(DateTimeMixin):

    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                verbose_name=_('User'))
    age = models.IntegerField(_('Age'), null=True, blank=True)

    class Meta:
        ordering = ['-id']
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    @property
    def fullname(self):
        return f'{self.user.first_name} {self.user.last_name}'

    def __str__(self):  # __unicode__ on Python 2
        return str(self.username)
