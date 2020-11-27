from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

from .models import (
	Shop, 
	Product, 
	ProductShop,
)


@admin.register(Shop)
class ShopAdmin(OSMGeoAdmin):
    list_display = ('id', 'name', 'address', 'owner', 'phone_no', 'location')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class ProductShopAdmin(admin.ModelAdmin):
    list_display = ('id',)


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductShop, ProductShopAdmin)
