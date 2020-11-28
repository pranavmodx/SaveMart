from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ShopApi, ProductShopApi

router = DefaultRouter()
router.register('shops', ShopApi, basename='shops')
urlpatterns = [
    path('hot_deals/', ProductShopApi.as_view(), name='hot_deals'),
] + router.urls
