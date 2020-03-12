from .serializers import VideoDataSerializer
from .models import VideoData
from rest_framework.views import APIView
from django.http import HttpResponse
from . import Preprocess
from clipping.models import VideoInfo


class PreprocessorSave(APIView):  # 전처리 하여 저장 (모델의 태그 선택)

    @staticmethod
    def post(request):
        serializer = VideoDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        # ** 추가 ** 모델에 대한 작업은 Preprocess.py 에서 실행
        return HttpResponse("save")


class PreprocessorDelete(APIView):  # 원본 영상을 삭제

    @staticmethod
    def delete(request):
        clip_info = request.data
        video_id = str((clip_info['videoId']))
        key_word = str((clip_info['keyword']))
        start_time = int(clip_info['startTime'])
        end_time = int(clip_info['endTime'])

        # 원본 DB 삭제
        queryset = VideoInfo.objects.all()
        queryset = queryset.filter(videoId=video_id, keyword=key_word, startTime=start_time, endTime=end_time)
        queryset.delete()

        # 'C:/Users/jaehee/capstone/Material_Ui_Capstone/public/clippingVideo/'
        # 'C:/Users/jaehee/capstone/Material_Ui_Capstone/public/thumbnails/'

        # '/Users/zigje9/Desktop/jenesis/public/clippingVideo/'
        # '/Users/zigje9/Desktop/jenesis/public/thumbnails/'

        # 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/clippingVideo/'
        # 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/thumbnails/'

        output_dir = '/Users/zigje9/Desktop/jenesis/public/clippingVideo/'  # 영상 저장경로, 후에 s3로 변경
        thumbnail_dir = '/Users/zigje9/Desktop/jenesis/public/thumbnails/'

        # 원본 영상,썸네일 삭제 ** 추가 s3로 변경 **
        Preprocess.original_delete(output_dir, thumbnail_dir, video_id, start_time, end_time)

        return HttpResponse("delete")



