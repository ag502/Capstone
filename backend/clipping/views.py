from .models import VideoInfo
from .serializers import VideoInfoSerializer
from rest_framework import viewsets
from .downloader.download_and_clip_video import DownloadClipper
from rest_framework.views import APIView
from django.http import HttpResponse
from . import Cliper

class VideoInfoViewSet(viewsets.ModelViewSet):
    queryset = VideoInfo.objects.all()
    serializer_class = VideoInfoSerializer

class ClipVideoDownloader(APIView):
    def post(self, request):
        clip_info = request.data
        video_id = str((clip_info['videoId']))  #받은 정보중 videoId만 검출 (후에 추가로 다른정보도 저장할것)
        output_dir = '/Users/zigje9/Desktop/test/'  #영상 저장경로, 후에 s3로 변경
        Cliper.clip_download(output_dir, video_id)

        # start_time = clip_info['startTime']
        # end_time = clip_info['endTime']  # 시간 str


        return HttpResponse("다운로드 종료")

