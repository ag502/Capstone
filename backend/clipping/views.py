from .models import VideoInfo
from .serializers import VideoInfoSerializer
from rest_framework import viewsets
from .downloader.download_and_clip_video import DownloadClipper

class VideoInfoViewSet(viewsets.ModelViewSet):
    queryset = VideoInfo.objects.all()
    serializer_class = VideoInfoSerializer
