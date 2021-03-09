import os
import uuid

# Django
from django.db import models
from django.utils.translation import ugettext_lazy as _

# local Django
from backend.mixins import DateTimeMixin
from users.models import User
from todo.models import Item


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

    is_active = models.BooleanField(_('Is active (can create active wallet)'),
                                    default=True)

    class Meta:
        ordering = ['bid_usd']
        verbose_name = _('Currency')
        verbose_name_plural = _('Currencies')

    def __str__(self):
        return '{0}'.format(self.symbol)


class Wallet(DateTimeMixin):
    # amount of total money in wallet
    balance = models.DecimalField(_('Balance'), max_digits=12,
                                  decimal_places=2, default=0)
    public_key = models.CharField(_('Public Key'), max_length=255, null=True,
                                  blank=True)
    private_key = models.CharField(_('Private Key'), max_length=255,
                                   null=True, blank=True)
    is_default = models.BooleanField(_('Is default'), default=False)
    owner = models.ForeignKey(User, verbose_name=_('Owner'),
                              related_name='wallets',
                              on_delete=models.CASCADE)
    currency = models.ForeignKey(Currency, verbose_name=_('Currency'),
                                 on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Wallet')
        verbose_name_plural = _('Wallets')

    def __str__(self):
        return '{}: ({}-{})'.format(self.id, self.currency.symbol,
                                    str(self.balance))


class Transaction(DateTimeMixin):
    """
    Class for transactions of money between wallets
    """
    class Status:
        INITIAL = 'initial'
        DENIED = 'denied'
        PENDING = 'pending'
        SUCCESS = 'success'
        CANCELLED = 'cancelled'

        ALL = (INITIAL, DENIED, PENDING, SUCCESS, CANCELLED)

        CHOICES = (
            (INITIAL, 'INITIAL'),
            (DENIED, 'DENIED'),
            (PENDING, 'PENDING'),
            (SUCCESS, 'SUCCESS'),
            (CANCELLED, 'CANCELLED'),
        )

    def get_default_currency():
        try:
            currency = Currency.objects.get(symbol='USD')
        except Currency.DoesNotExists:
            return 1
        return currency.id

    amount = models.DecimalField(_('Amount'), max_digits=12, decimal_places=2)
    currency = models.ForeignKey(Currency, verbose_name=_('Currency'),
                                 on_delete=models.SET_NULL, null=True,
                                 default=get_default_currency())
    item = models.ForeignKey(Item, verbose_name=_('Item'), null=True,
                             on_delete=models.SET_NULL)
    from_wallet = models.ForeignKey(Wallet, verbose_name=_('From Wallet'),
                                    related_name='transactions_send',
                                    on_delete=models.CASCADE)
    to_wallet = models.ForeignKey(Wallet, verbose_name=_('To wallet'),
                                  related_name='transactions_received',
                                  on_delete=models.CASCADE, null=True)
    status = models.CharField(_('Status'), max_length=25,
                              choices=Status.CHOICES,
                              default=Status.INITIAL)

    class Meta:
        verbose_name = ('Transaction')
        verbose_name_plural = ('Transactions')

    def __str__(self):
        return 'From {} {}'.format(self.from_wallet.id, self.amount)

    def save(self, *args, **kwargs):
        paid_wallet = self.from_wallet
        owner_wallet = self.item.owner.wallets.get(currency=self.currency)
        self.to_wallet = owner_wallet
        paid_wallet.balance -= self.amount
        paid_wallet.save()
        owner_wallet.balance += self.amount
        owner_wallet.save()
        super().save(*args, **kwargs)
