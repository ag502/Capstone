from .models import VideoInfo
from .serializers import VideoInfoSerializer
from rest_framework import viewsets

class VideoInfoViewSet(viewsets.ModelViewSet):
    queryset = VideoInfo.objects.all()
    serializer_class = VideoInfoSerializer