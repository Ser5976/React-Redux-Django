# todo/models.py

from django.db import models

# Django
from django.utils.translation import ugettext_lazy as _

# local Django
from backend.mixins import DateTimeMixin
from users.models import User

# Create your models here.


class Item(DateTimeMixin):
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              verbose_name=_('Owner'))
    title = models.CharField(_('Item'), max_length=120)
    description = models.TextField()

    class Meta:
        verbose_name = _('Item')
        verbose_name_plural = _('Items')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        print('saving item')
        # try:
        #     self.owner
        #     print('success')
        # except User.DoesNotExist:
        #     print('DoesNotExist error')
        #     self.owner = User.objects.get(user__is_superuser=True)
        # except BaseException as e:
        #     print(e)
        super(Item, self).save(*args, **kwargs)
