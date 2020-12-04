from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ShopViewSet, ProductModelViewset, HotDealsApi, SearchProductShopApi, ProductShopApi

router = DefaultRouter()
router.register('shops', ShopViewSet, basename='shops')
router.register('products', ProductModelViewset, basename='products')
router.register('product_shop/product', ProductShopApi, basename='product_shop')
urlpatterns = [
    path('hot_deals/', HotDealsApi.as_view(), name='hot_deals'),
    path('product_shop/', SearchProductShopApi.as_view(), name='search_product_shop'),

] + router.urls
