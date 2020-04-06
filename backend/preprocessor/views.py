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
                                              endTime__in=video_field[3], keyword__in=video_field[4])
        model_tag = video_data.values('model_tag').distinct()

        # print(video_data)
        # print(model_tag)
        sending_dict = {}
        model_temp = {}
        for tag in model_tag:
            video_data_by_model = video_data.filter(model_tag=tag['model_tag'])
            model_temp[tag['model_tag']] = VideoDataSerializer(video_data_by_model, many=True).data
        sending_dict['model'] = model_temp
        print(sending_dict)
        # for videos in video_info:
        #     video = videos.split(',')
        #     print(video)
        #     video_data = video_data.filter(videoId__in=['c1Xoj674Bmw', '89ppVWIint8'], startTime='0', endTime__in=[31, 27])

        # self._video_info = request.data
        # video_id = str(self._video_info['videoID'])
        # start_time = int(self._video_info['startTime'])
        # end_time = int(self._video_info['endTime'])
        #
        # video_data = VideoData.objects.filter(videoId=video_id, startTime=start_time, endTime=end_time)
        # model_tags = video_data.values('model_tag').distinct()
        # keyword = video_data.values('keyword').distinct()[0]['keyword']
        # keywords = [keyword]
        #
        # sending_json = {'keyword': keywords}
        #
        # print(sending_json)
        # for tag in model_tags:
        #     print(tag)
        #     video_by_model = video_data.filter(model_tag=tag['model_tag'])
        #     video_by_model_sil = VideoDataSerializer(video_by_model, many=True)
        #     sending_json[tag['model_tag']] = video_by_model_sil.data


        # serializer = VideoDataSerializer(video_data, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return JsonResponse(sending_dict, safe=False)
        # return HttpResponse('TEST')


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

        # return HttpResponse("save")
        return JsonResponse(status=200)


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

        # 원본 영상,썸네일 삭제 ** 추가 s3로 변경 **
        # Preprocess.original_delete(video_id, start_time, end_time)

        return HttpResponse("delete")
