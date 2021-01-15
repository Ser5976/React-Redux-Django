import os
import uuid

# Django
from django.db import models
from django.utils.translation import ugettext_lazy as _

# local Django
from backend.mixins import DateTimeMixin
from users.models import User


def currency_icon_path(self, filename):
    f_name, f_ext = os.path.splitext(filename)
    return 'currency/{f_name}'.format(
        f_name=str(uuid.uuid4()) + f_ext)


class Currency(DateTimeMixin):
    """Model Currency."""

    name = models.CharField(_('Name'), max_length=50, unique=True)
    symbol = models.CharField(_('Symbol'), max_length=3, unique=True)

    bid_usd = models.FloatField(_('Bid USD'), blank=True, null=True)

    icon = models.ImageField(
        _('Icon'), upload_to=currency_icon_path, default='', blank=True)

    is_crypto = models.BooleanField(_('Is crypto'), default=False)

    is_active = models.BooleanField(_('Is active(can create active wallet)'),
                                    default=True)

    class Meta:
        ordering = ['bid_usd']
        verbose_name = _('Currency')
        verbose_name_plural = _('Currencies')

    def __str__(self):
        return '{0}'.format(self.symbol)


class Wallet(DateTimeMixin):
    # amount of total money in wallet
    balance = models.DecimalField(_('Balance'), max_digits=10,
                                  decimal_places=2, default=0)
    owner = models.ForeignKey(User, verbose_name=_('Owner'),
                              related_name='wallets',
                              on_delete=models.CASCADE)
    currency = models.OneToOneField(Currency, verbose_name=_('Currency'),
                                    on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Wallet')
        verbose_name_plural = _('Wallets')

    def __str__(self):
        return '{}: {}'.format(self.currency.symbol, str(self.balance))
