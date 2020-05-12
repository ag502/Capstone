from .serializers import VideoDataSerializer
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from . import Preprocess
from .discriminators import face_discriminator
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
        if '?' in self.current_url:
            model_tag = request.GET.get('model_tag')
            video_data = VideoData.objects.filter(model_tag=model_tag).order_by('-id')
        else:
            video_data = VideoData.objects.all().order_by('-id')

        serializer = VideoDataSerializer(video_data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        self._video_info = request.data
        print(self._video_info)

        # video_info = self._video_info['videoInfo']
        video_info = [video.split(',') for video in self._video_info['videoInfo']]

        # 0: index, 1: videoId, 2: startTime 3: endTime, 4: keyword
        video_field = [field for field in zip(*video_info)]
        print(video_field)

        video_data = VideoData.objects.filter(videoId__in=video_field[1], startTime__in=video_field[2],
                                              endTime__in=video_field[3], keyword__in=video_field[4],
                                              final_save=False)
        model_tag = video_data.values('model_tag').distinct()

        sending_dict = {}
        model_temp = {}
        for tag in model_tag:
            video_data_by_model = video_data.filter(model_tag=tag['model_tag'])
            model_temp[tag['model_tag']] = VideoDataSerializer(video_data_by_model, many=True).data
        sending_dict['model'] = model_temp

        return JsonResponse(sending_dict, safe=False)


class PreprocessorSave(APIView):  # 전처리 하여 저장 (모델의 태그 선택)
    @staticmethod
    def post(request):
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
                video_number=num,
                final_save=0
            )

            video.save()

        Preprocess.db_update(video_id, keyword, start_time, end_time, model_tag)  # 전처리된 모델태그를 원본 DB 업데이트
        # return HttpResponse("save")
        return HttpResponse("save")
        # return JsonResponse(status=200)


class PreprocessorDelete(APIView):  # 원본 영상을 삭제
    @staticmethod
    def post(request):
        clip_info = request.data
        print(request.data)

        # 원본 DB 삭제
        video_info = [video.split(',') for video in clip_info['videoInfo']]
        video_info_zip = [field for field in zip(*video_info)]

        #[(idx1, idx2...), (videoId1, videoId2, ...), (startTime1,...), (endTime1, ...), (keyword1, ..)]
        queryset = VideoInfo.objects.filter(videoId__in=video_info_zip[1], keyword__in=video_info_zip[4],
                                   startTime__in=video_info_zip[2], endTime__in=video_info_zip[3])
        queryset.delete()

        # 원본 영상,썸네일 삭제 ** 추가 s3로 변경 **
        # Preprocess.original_delete(video_id, start_time, end_time)

        return HttpResponse("delete")


class PreprocessorFinalSave(APIView):
    def post(self, request):
        processed_video = [video.split(',') for video in request.data['videoInfo']]
        processed_video_zip = [video for video in zip(*processed_video)]

        # [(model_tag), (videoId1,..), (startTime1, ..), (endTime1, ..), (videoNumber1,..)]
        queryset = VideoData.objects.filter(model_tag__in=processed_video_zip[0], videoId__in=processed_video_zip[1],
                                            startTime__in=processed_video_zip[2], endTime__in=processed_video_zip[3],
                                            video_number__in=processed_video_zip[4])
        queryset.update(final_save=True)

        return HttpResponse('Final_Save')

