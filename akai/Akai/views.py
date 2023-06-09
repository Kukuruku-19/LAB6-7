from django.shortcuts import render
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Order, Category
from .serializers import ProductSerializer, OrderSerializer, CreateOrderSerializer, CategorySerializer
from rest_framework.filters import SearchFilter


# Create your views here.


class ProductAPIView(generics.ListAPIView):
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("category", )
    serializer_class = ProductSerializer
    queryset = Product.objects.prefetch_related("category").all()


class OrderAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.prefetch_related("order_item")


class OrderCreateAPIView(generics.CreateAPIView):
    serializer_class = CreateOrderSerializer


class CategoryAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
