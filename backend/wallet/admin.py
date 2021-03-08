from django.contrib import admin

from wallet.models import Wallet, Currency, Transaction


class WalletInline(admin.TabularInline):
    model = Wallet


class WalletAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'balance', 'is_default', 'currency')
    list_display_links = ('owner', 'balance',)


class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('id', 'symbol', 'name', 'bid_usd', 'is_crypto',
                    'is_active')
    list_display_links = ('symbol', 'name',)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'currency', 'from_wallet', 'to_wallet',
                    'item', 'status',)
    list_display_links = ('amount', 'status',)


admin.site.register(Wallet, WalletAdmin)
admin.site.register(Currency, CurrencyAdmin)
admin.site.register(Transaction, TransactionAdmin)
