from preprocessor.models import VideoData
from preprocessor.serializers import VideoDataSerializer
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from . import data_manager


class DataDelete(APIView):
    @staticmethod
    def post(request):
        delete_list = request.data
        print(delete_list)
        try:
            data_manager.data_delete(delete_list)  # S3 데이터 삭제 예정
            data_manager.db_delete(delete_list)  # DB 삭제

        except Exception as err:
            print('{} error!!'.format(err))

        return HttpResponse("delete")


class DataManagement(APIView):
    def get(self, request, model, video_info=None):
        video_data = None
        if video_info is None:
            video_data = VideoData.objects.filter(model_tag=model, final_save=True)
            video_fields = video_data.values('videoId', 'startTime', 'endTime', 'keyword').distinct()
            serializer = VideoDataSerializer(video_fields, many=True)
        else:
            video_id, start_time, end_time, keyword = video_info.split('&')
            video_data = VideoData.objects.filter(model_tag=model, final_save=True, videoId=video_id,
                                                  startTime=start_time, endTime=end_time, keyword=keyword)
            serializer = VideoDataSerializer(video_data, many=True)

        return JsonResponse(serializer.data, safe=False)

    def post(self, request, model):
        keyword = request.data['videoInfo']

        video_data = None
        if len(keyword) == 0:
            video_data = VideoData.objects.filter(model_tag=model, final_save=True)
        else:
            video_data = VideoData.objects.filter(model_tag=model, final_save=True, keyword__in=keyword)
        video_fields = video_data.values('videoId', 'startTime', 'endTime', 'keyword').distinct()
        serializer = VideoDataSerializer(video_fields, many=True)

        return JsonResponse(serializer.data, safe=False)

