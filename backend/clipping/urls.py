from django.conf.urls import url, include
from django.urls import path
from . import views

urlpatterns = [
    path('clipping/', views.ClipVideoDownloader.as_view()),
              ]