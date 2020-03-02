from django.conf.urls import url, include
from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('clipping',views.VideoInfoViewSet)

# urlpatterns = router.urls  # 라우터 기능 상실.. 해결해야함

urlpatterns = [path('clipping/', views.ClipVideoDownloader.as_view())]

