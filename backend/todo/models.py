# todo/models.py

from django.db import models

# Django
from django.utils.translation import ugettext_lazy as _

# local Django
from backend.mixins import DateTimeMixin
from users.models import CustomUser

# Create your models here.


class Item(DateTimeMixin):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                              verbose_name=_('Owner'))
    title = models.CharField(_('Item'), max_length=120)
    description = models.TextField()

    class Meta:
        verbose_name = _('Item')
        verbose_name_plural = _('Items')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        try:
            self.owner
        except CustomUser.DoesNotExist:
            self.owner = CustomUser.objects.get(user__is_superuser=True)
        super(Item, self).save(*args, **kwargs)
