# todo/admin.py

from django.contrib import admin
from todo.models import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'owner', 'created_at')


# Register your models here.
admin.site.register(Item, ItemAdmin)
