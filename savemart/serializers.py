from rest_framework import serializers

from .models import (
    Shop,
    Product,
    ProductShop,
)


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductShopSerializer(serializers.ModelSerializer):
    product = serializers.CharField()
    shop = serializers.CharField()
    address = serializers.CharField(required=False)
    distance = serializers.CharField(required=False)

    class Meta:
        model = ProductShop
        fields = '__all__'

    def create(self, validated_data):
        product_id = validated_data.get('product', None)
        shop_id = validated_data.get('shop', None)
        price = validated_data.get('price', None)
        if product_id and shop_id and price:
            product = Product.objects.get(pk=product_id)
            shop = Shop.objects.get(pk=shop_id)
            instance = ProductShop.objects.create(product=product, shop=shop, price=price)
            return instance