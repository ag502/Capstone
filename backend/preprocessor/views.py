from .serializers import VideoDataSerializer
from .models import VideoData
from rest_framework.views import APIView
from django.http import HttpResponse
from . import Preprocess
from clipping.models import VideoInfo


class VideoPreprocessor(APIView):

    def post(self, request):
        serializer = VideoDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        clip_info = request.dataf
        video_id = str((clip_info['videoId']))
        key_word = str((clip_info['keyword']))
        start_time = int(clip_info['startTime'])
        end_time = int(clip_info['endTime'])

        # DB 삭제 쿼리문 - 요청시 태그모델을 생성하고, 원본 DB 삭제
        # ** 추가 ** S3 접근하여 영상부터 삭제
        queryset = VideoInfo.objects.all()
        queryset = queryset.filter(videoId=video_id, keyword=key_word, startTime=start_time, endTime=end_time)
        queryset.delete()

        # ** 추가 ** 모델에 대한 작업은 Preprocess.py 에서 실행
        return HttpResponse("hello")



