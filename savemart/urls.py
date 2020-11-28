from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ShopViewSet, ProductModelViewset, HotDealsApi

router = DefaultRouter()
router.register('shops', ShopViewSet, basename='shops')
router.register('products', ProductModelViewset, basename='products')
urlpatterns = [
    path('hot_deals/', HotDealsApi.as_view(), name='hot_deals'),
] + router.urls
