# todo/models.py

from django.db import models

# Django
from django.utils.translation import ugettext_lazy as _

# local Django
from backend.mixins import DateTimeMixin

# Create your models here.


class Item(DateTimeMixin):
    title = models.CharField(_('Item'), max_length=120)
    description = models.TextField()

    class Meta:
        verbose_name = _('Item')
        verbose_name_plural = _('Items')

    def __str__(self):
        return self.title
