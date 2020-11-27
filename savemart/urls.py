from django.urls import path

from .views import (
	ShopApi,
	# ProductShopApi,
)

urlpatterns = [
    path('shops/', ShopApi.as_view(), name='shops'),
    # path('hot_deals/', ProductShopApi.as_view(), name='hot_deals'),
]