from .serializers import VideoInfoSerializer
from .models import VideoInfo
from rest_framework.views import APIView
from django.http import HttpResponse
from . import Cliper


class ClipVideoDownloader(APIView):

    def post(self, request):
        serializer = VideoInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        clip_info = request.data
        video_id = str((clip_info['videoId']))  # 받은 정보중 videoId만 검출 (후에 추가로 다른정보도 저장할것)
        output_dir = '/Users/zigje9/Desktop/jenesis/backend/clippingVideo/'  # 영상 저장경로, 후에 s3로 변경
        thumnail_dir = '/Users/zigje9/Desktop/jenesis/backend/thumnails/'
        Cliper.clip_download(output_dir, video_id)  # 원본영상을 받음

        start_time = int(clip_info['startTime'])
        end_time = int(clip_info['endTime'])

        Cliper.clip_section(output_dir, video_id, start_time, end_time)  # 시작시간,끝시간으로 영상처리
        Cliper.createThumnail(output_dir, thumnail_dir, video_id, start_time, end_time) # thumnail 생성

        Cliper.removeFile(output_dir, thumnail_dir, video_id, start_time, end_time)

        # DB의 clip 완료여부를 필드값 변경
        queryset = VideoInfo.objects.all()
        queryset = queryset.filter(videoId=video_id, startTime=start_time, endTime=end_time)
        queryset.update(clip_complete=True)

        return HttpResponse("hi")


