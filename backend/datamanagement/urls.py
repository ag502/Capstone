from django.conf.urls import url, include
from django.urls import path
from . import views

urlpatterns = [
    path('datamanagement/', views.DataDelete.as_view()),
    ]
