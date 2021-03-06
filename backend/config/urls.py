from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('clipping.urls')),
    path('', include('preprocessor.urls')),
    path('', include('datamanagement.urls')),
    path('', include('testing.urls')),
]
