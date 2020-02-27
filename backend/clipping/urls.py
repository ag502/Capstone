from django.conf.urls import url, include
from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('clipping',views.VideoInfoViewSet)

urlpatterns = router.urls