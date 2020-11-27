from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.contrib.gis.geos import fromstr

from .models import (
    Shop,
    Product,
    ProductShop,
)

from .serializers import (
    ShopSerializer,
    # ProductSerializer,
    # ProductShopSerializer,
)


class ShopApi(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        queryset = Shop.objects.all()
        serializer = ShopSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request):
        latitude = request.data['latitude']
        longitude = request.data['longitude']

        location = fromstr(f'POINT({longitude} {latitude})', srid=4326)

        request.data['location'] = location

        serializer = ShopSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


# class ProductShopApi(APIView):
#     permission_classes = (AllowAny, )

# 	queryset = ProductShop.objects.all()
#     serializer = ProductShopSerializer(queryset, many=True)

#     def get(self, request):
#         queryset = ProductShop.objects.all()
#         serializer = ProductShopSerializer(queryset, many=True)
#         return Response(serializer.data)

    # def post(self, request):
#     pk = request.data.pop('id', None)
#     if pk is not None:
#         instance = Flat.objects.get(pk=pk)
#         serializer = MakePaymentSerializer(instance, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
