from django.db.models import Min
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import views, viewsets, status, generics, filters
from django.contrib.gis.geos import fromstr
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance as D
from django.contrib.gis.db.models.functions import Distance

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
    permission_classes = (AllowAny,)

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


class HotDealsApi(views.APIView):
    def get(self, request, *args, **kwargs):
        lat = request.GET.get('latitude')
        long = request.GET.get('longitude')
        if not (lat or long) or lat.isalpha() or long.isalpha():
            return Response({"error": "invalid location coordinates"}, status=status.HTTP_400_BAD_REQUEST)
        lat = float(lat)
        long = float(long)
        user_location = Point(long, lat)
        queryset = ProductShop.objects.filter(shop__location__distance_lt=(user_location, D(km=10))) \
            .order_by().order_by('product', 'price').distinct('product') \
            .annotate(distance=Distance('shop__location', user_location))
        serializer = ProductShopSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchProductShopApi(generics.ListAPIView):
    search_fields = ['product__name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = ProductShopSerializer

    def get_queryset(self):
        lat = self.request.GET.get('latitude')
        long = self.request.GET.get('longitude')
        if not (lat or long) or lat.isalpha() or long.isalpha():
            return ProductShop.objects.none()
        lat = float(lat)
        long = float(long)
        user_location = Point(long, lat)
        queryset = ProductShop.objects.filter(shop__location__distance_lt=(user_location, D(km=0.4))).order_by('price')\
            .annotate(distance=Distance('shop__location', user_location))
        return queryset

    def get(self, request):
        lat = request.GET.get('latitude')
        long = request.GET.get('longitude')
        if not (lat or long) or lat.isalpha() or long.isalpha():
            return Response({"error": "invalid location coordinates"})
        latitude = float(lat)
        longitude = float(long)
        user_location = Point(longitude, latitude)
        queryset = ProductShop.objects.filter(shop__location__distance_lt=(user_location, D(km=0.3)))\
            .annotate(distance=Distance('shop__location', user_location))
        serializer = ProductShopSerializer(queryset, many=True)
        return Response(serializer.data)
