from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from django.contrib.gis.geos import fromstr

from .models import (
    Shop,
    Product,
    ProductShop,
)

from .serializers import (
    ShopSerializer,
    ProductSerializer,
    ProductShopSerializer,
)


class ShopViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny, )

    def retrieve(self, request, pk):
        query = Shop.objects.get(pk=pk)
        serializer = ShopSerializer(query)
        return Response(serializer.data)

    def list(self, request):
        queryset = Shop.objects.all()
        serializer = ShopSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        latitude = request.data.pop('latitude')
        longitude = request.data.pop('longitude')
        if latitude and longitude:
            location = fromstr(f'POINT({longitude} {latitude})', srid=4326)
            request.data['location'] = location
        serializer = ShopSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, pk):
        instance = Shop.objects.get(pk=pk)
        latitude = request.data.get('latitude', None)
        longitude = request.data.get('longitude', None)
        if latitude and longitude:
            location = fromstr(f'POINT({longitude} {latitude})', srid=4326)
            request.data['location'] = location
        serializer = ShopSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = Shop.objects.get(pk=pk)
        response = instance.delete()
        return Response(response)


class ProductModelViewset(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
