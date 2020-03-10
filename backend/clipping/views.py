from .serializers import VideoInfoSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from django.http import HttpResponse
from .models import VideoInfo
from . import Cliper


class ClipVideoDownloader(APIView):

    @staticmethod
    def get(request):
        if request.method == 'GET':
            video_info = VideoInfo.objects.all().order_by('-id')
            serializer = VideoInfoSerializer(video_info, many = True)
            return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = VideoInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        clip_info = request.data
        video_id = str((clip_info['videoId']))  # 받은 정보중 videoId만 검출 (후에 추가로 다른정보도 저장할것)
        output_dir = 'C:/Users/LG\Desktop/Material_Ui_Capstone/public/clippingVideo/'  # 영상 저장경로, 후에 s3로 변경
        thumnail_dir = 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/thumbnails/'
        Cliper.clip_download(output_dir, video_id)  # 원본영상을 받음

        start_time = int(clip_info['startTime'])
        end_time = int(clip_info['endTime'])

        Cliper.clip_section(output_dir, video_id, start_time, end_time)  # 시작시간,끝시간으로 영상처리
        Cliper.createThumnail(output_dir, thumnail_dir, video_id, start_time, end_time) # thumnail 생성

        # Cliper.removeFile(output_dir, thumnail_dir, video_id, start_time, end_time)
        return JsonResponse(serializer.data, status=200)

# C: / Users / jaehee / capstone / Material_Ui_Capstone / backend / clippingVideo /
# C:/Users/jaehee/capstone/Material_Ui_Capstone/backend/thumnails/