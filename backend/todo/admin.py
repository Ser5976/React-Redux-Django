# todo/admin.py

from django.contrib import admin
from django_reverse_admin import ReverseModelAdmin

from todo.models import Item, Address, Comment


class AddressAdmin(admin.ModelAdmin):
    list_display = ('country', 'city', 'house_number', 'zip_code')
    list_display_links = ('country', 'city',)
    search_fields = ('country', 'city',)
    date_hierarchy = 'created_at'


class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'text', 'item', 'owner', 'created_at')
    list_display_links = ('name',)
    search_fields = ('name',)
    date_hierarchy = 'created_at'


class CommentInline(admin.TabularInline):
    model = Comment
    fields = ('name', 'text', 'owner',)
    extra = 0


class ItemAdmin(ReverseModelAdmin):
    list_display = ('id', 'house_type', 'description', 'owner', 'status',
                    'created_at')
    list_display_links = ('house_type', 'description',)
    search_fields = ('house_type', 'owner', 'status',)
    date_hierarchy = 'created_at'
    inline_type = 'tabular'
    inline_reverse = ['address']
    inlines = [CommentInline]


# Register your models here.
admin.site.register(Address, AddressAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Item, ItemAdmin)
