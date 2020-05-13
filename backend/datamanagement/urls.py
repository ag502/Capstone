from django.conf.urls import url, include
from django.urls import path
from . import views

urlpatterns = [
    path('datamanagement/', views.DataDelete.as_view()),
    path('datamanagement/downloads/', views.DataDownload.as_view()),
    path('datamanagement/<str:model>/', views.DataManagement.as_view()),
    path('datamanagement/<str:model>/<str:video_info>/', views.DataManagement.as_view())
    ]
