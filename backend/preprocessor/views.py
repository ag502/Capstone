from .serializers import VideoDataSerializer
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from . import Preprocess, face_discriminator
from clipping.models import VideoInfo
from .models import VideoData


class Preprocessor(APIView):

    def __init__(self):
        super().__init__()
        self._current_url = ''
        self._video_info = ''

    @property
    def current_url(self):
        return self._current_url

    @current_url.setter
    def current_url(self, url):
        self._current_url = url

    def get(self, request):
        self.current_url = request.get_full_path()
        if '?' in self.current_url:
            model_tag = request.GET.get('model_tag')
            video_data = VideoData.objects.filter(model_tag=model_tag).order_by('-id')
        else:
            video_data = VideoData.objects.all().order_by('-id')

        serializer = VideoDataSerializer(video_data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        self._video_info = request.data
        video_id = str(self._video_info['videoID'])
        start_time = int(self._video_info['startTime'])
        end_time = int(self._video_info['endTime'])

        video_data = VideoData.objects.filter(videoId=video_id, startTime=start_time, endTime=end_time)
        model_tags = video_data.values('model_tag').distinct()

        sending_json = {}
        for tag in model_tags:
            # video_by_model_json = {}
            video_by_model = video_data.filter(model_tag=tag['model_tag'])
            video_by_model_sil = VideoDataSerializer(video_by_model, many=True)
            sending_json[tag['model_tag']] = video_by_model_sil.data
            # sending_arr.append(video_by_model_json)

        # serializer = VideoDataSerializer(video_data, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return JsonResponse(sending_json, safe=False)


class PreprocessorSave(APIView):  # 전처리 하여 저장 (모델의 태그 선택)
    @staticmethod
    def post(request):
        # serializer = VideoDataSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        video_info = request.data
        video_id = str((video_info['videoId']))
        keyword = str((video_info['keyword']))
        start_time = int(video_info['startTime'])
        end_time = int(video_info['endTime'])
        model_tag = str((video_info['model_tag']))

        Preprocess.createframes(video_id, start_time, end_time)
        time_section = face_discriminator.facedetect()
        video_numbers = Preprocess.time_clip(model_tag, video_id, time_section, start_time, end_time)

        for num in video_numbers:
            video = VideoData(
                videoId=video_id,
                keyword=keyword,
                startTime=start_time,
                endTime=end_time,
                model_tag=model_tag,
                video_number=num
            )

            video.save()

        return HttpResponse("save")


class PreprocessorDelete(APIView):  # 원본 영상을 삭제
    @staticmethod
    def post(request):
        clip_info = request.data
        print(request.data)
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

        # output_dir = 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/clippingVideo/'  # 영상 저장경로, 후에 s3로 변경
        # thumbnail_dir = 'C:/Users/LG/Desktop/Material_Ui_Capstone/public/thumbnails/'
        #
        # # 원본 영상,썸네일 삭제 ** 추가 s3로 변경 **
        # Preprocess.original_delete(output_dir, thumbnail_dir, video_id, start_time, end_time)

        return HttpResponse("delete")
