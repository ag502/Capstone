from django.urls import path
from . import views

urlpatterns = [
    path('testing/<str:model>/', views.Testing.as_view()),
]
