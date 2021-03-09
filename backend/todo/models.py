# todo/models.py
import os
import uuid
from smtplib import SMTPAuthenticationError

# Django
from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.core.mail import send_mail
from django.conf import settings

# local Django
from backend.mixins import DateTimeMixin
from users.models import User
# from wallet.models import Currency


def house_photo_path(self, filename):
    f_name, f_ext = os.path.splitext(filename)
    return 'houses/{f_name}'.format(
        f_name=str(uuid.uuid4()) + f_ext)

# Create your models here.
class Address(DateTimeMixin):

    country = models.CharField(_('Country'), max_length=50)
    city = models.CharField(_('City'), max_length=50)
    street = models.CharField(_('Street'), max_length=50)
    house_number = models.CharField(_('House number'), max_length=25)
    zip_code = models.IntegerField(_('Zip code'), null=True, blank=True)

    class Meta:
        verbose_name = _('Address')
        verbose_name_plural = _('Addresses')

    def __str__(self):
        return f'{self.country} {self.city} {self.street}-{self.house_number}'


class Item(DateTimeMixin):

    class Status(object):
        ON_SAIL = 1
        SAILED = 2
        SOLD = 3

        ALL = [ON_SAIL, SAILED, SOLD]

        CHOICES = (
            (ON_SAIL, _('On sail')),
            (SAILED, _('Sailed')),
            (SOLD, _('Sold')),
        )

    class HouseType(object):
        COTTAGE = 1
        MULTISTOREY = 2

        ALL = [COTTAGE, MULTISTOREY]

        CHOICES = (
            (COTTAGE, _('Cottage')),
            (MULTISTOREY, _('Multistorey house')),
        )

    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              verbose_name=_('Owner'))
    description = models.TextField()
    status = models.IntegerField(
        _('Status'),
        choices=Status.CHOICES,
        default=Status.ON_SAIL,
        db_index=True,
    )
    house_type = models.IntegerField(
        _('Type'),
        choices=HouseType.CHOICES,
        default=HouseType.COTTAGE,
        db_index=True,
    )
    address = models.OneToOneField(Address, on_delete=models.CASCADE,
                                   blank=True, null=True, related_name='item')
    photo = models.ImageField(_('Photo'), upload_to=house_photo_path,
                              default='', blank=True)
    price = models.DecimalField(_('Price'), max_digits=15, decimal_places=2,
                                blank=True, default=0)
    currency = models.ForeignKey('wallet.Currency', on_delete=models.CASCADE,
                                 null=True, verbose_name=_('Currency'))

    class Meta:
        verbose_name = _('Item')
        verbose_name_plural = _('Items')
        ordering = ['created_at']

    def __str__(self):
        return f'{self.get_house_type_display()} {self.get_status_display()}'

    def save(self, *args, **kwargs):
        try:
            send_mail('Django React', f'Your house - {self.house_type} succefully added',
                      settings.EMAIL_HOST_USER, [f'{self.owner.email}'],
                      fail_silently=False)
        except SMTPAuthenticationError:
            pass
        super(Item, self).save(*args, **kwargs)


class Comment(DateTimeMixin):
    item = models.ForeignKey(Item, on_delete=models.CASCADE,
                             related_name='comments')
    name = models.CharField(_('Name'), max_length=80)
    text = models.TextField(_('Text'))
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='comments')
    acted = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('Comment')
        verbose_name_plural = _('Comments')
        ordering = ('created_at',)

    def __str__(self):
        return f'Comment by {self.name} on {self.item}'
