from django.db import models


class Shop(models.Model):
	name = models.CharField(max_length=100)
	address = models.CharField(max_length=200, null=True, blank=True)
	owner = models.CharField(max_length=100, null=True, blank=True)
	phone_no = models.DecimalField(
        max_digits=12, decimal_places=0, null=True, blank=True)
	longitude = models.FloatField(null=True, blank=True)
	latitude = models.FloatField(null=True, blank=True)


class Product(models.Model):
    name = models.CharField(max_length=100)


class Product_Shop(models.Model):
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
	price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)