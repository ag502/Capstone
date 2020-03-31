from .serializers import VideoInfoSerializer
from .models import VideoInfo
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
            serializer = VideoInfoSerializer(video_info, many=True)
            return JsonResponse(serializer.data, safe=False)

    @staticmethod
    def post(request):
        serializer = VideoInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()


        clip_info = request.data
        video_id = str((clip_info['videoId']))  # 받은 정보중 videoId만 검출 (후에 추가로 다른정보도 저장할것)
        start_time = int(clip_info['startTime'])
        end_time = int(clip_info['endTime'])

        # 'C:/Users/jaehee/capstone/Material_Ui_Capstone/public/clippingVideo/'
        # 'C:/Users/jaehee/capstone/Material_Ui_Capstone/public/thumbnails/'

        # '/Users/zigje9/Desktop/jenesis/public/clippingVideo/'
        # '/Users/zigje9/Desktop/jenesis/public/thumbnails/'

        # 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/clippingVideo/'
        # 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/thumbnails/'

        output_dir = 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/clippingVideo/'  # 영상 저장경로, 후에 s3로 변경
        thumbnail_dir = 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/thumbnails/'

        response_status = 200
        queryset = VideoInfo.objects.all()
        queryset = queryset.filter(videoId=video_id, startTime=start_time, endTime=end_time)

        try:
            Cliper.clip_download(output_dir, video_id)  # 원본영상을 받음
            Cliper.clip_section(output_dir, video_id, start_time, end_time)  # 시작시간,끝시간으로 영상처리
            Cliper.createThumbnail(output_dir, thumbnail_dir, video_id, start_time, end_time) # thumbnail 생성
            # Cliper.removeFile(output_dir, thumbnail_dir, video_id, start_time, end_time)

            # DB의 clip 완료여부를 필드값 변경
            queryset.update(clip_complete="success")
        except Exception as err:
            print('{} error!!'.format(err))
            queryset.update(clip_complete='fail')
            response_status = 500

        return JsonResponse(serializer.data, status=response_status)

