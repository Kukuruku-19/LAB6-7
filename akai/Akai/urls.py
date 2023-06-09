from django.urls import path
from .views import ProductAPIView, OrderAPIView, OrderCreateAPIView, CategoryAPIView

urlpatterns = [
    path('product/', ProductAPIView.as_view()),
    path('order/', OrderCreateAPIView.as_view()),
    path('category/', CategoryAPIView.as_view()),
    path('order/<int:pk>/', OrderAPIView.as_view()),
]
