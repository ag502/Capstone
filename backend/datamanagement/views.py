from preprocessor.models import VideoData
from preprocessor.serializers import VideoDataSerializer
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from . import data_manager


class DataDelete(APIView):
    @staticmethod
    def post(request):
        delete_list = [video.split(',') for video in request.data['videoInfo']]
        print(delete_list)
        delete_list_zip = [field for field in zip(*delete_list)]
        print(delete_list_zip)

        # [(modelTag1,..), (keyword1, ..), (videoId1, ..), (startTime1,..), (endTime1, ..)]
        # 폴더 삭제
        if len(delete_list_zip) == 5:
            queryset = VideoData.objects.filter(model_tag__in=delete_list_zip[0], keyword__in=delete_list_zip[1],
                                                videoId__in=delete_list_zip[2], startTime__in=delete_list_zip[3],
                                                endTime__in=delete_list_zip[4], final_save=True)
            final_one_video = []
            for video in queryset:
                final_one_video.append([video.videoId, video.model_tag, video.startTime, video.endTime, video.video_number])
            data_manager.folder_delete(final_one_video)
            queryset.delete()
        # 파일 삭제
        else:
            queryset = VideoData.objects.filter(model_tag__in=delete_list_zip[0], keyword__in=delete_list_zip[1],
                                                videoId__in=delete_list_zip[2], startTime__in=delete_list_zip[3],
                                                endTime__in=delete_list_zip[4], video_number__in=delete_list_zip[5],
                                                final_save=True).delete()
            data_manager.file_delete(delete_list)


        # try:
        #     data_manager.data_delete(delete_list)  # S3 데이터 삭제 예정
        #     data_manager.db_delete(delete_list)  # DB 삭제
        #
        # except Exception as err:
        #     print('{} error!!'.format(err))

        return HttpResponse("delete")


class DataDownload(APIView):
    @staticmethod
    def post(request):
        download_list = [video.split(',') for video in request.data['videoInfo']]
        download_list_zip = [field for field in zip(*download_list)]

        # 폴더 다운로드
        if len(download_list_zip) == 5:
            queryset = VideoData.objects.filter(model_tag__in=download_list_zip[0], keyword__in=download_list_zip[1],
                                                videoId__in=download_list_zip[2], startTime__in=download_list_zip[3],
                                                endTime__in=download_list_zip[4], final_save=True)
            final_one_video = []
            for video in queryset:
                final_one_video.append(
                    [video.videoId, video.model_tag, video.startTime, video.endTime, video.video_number])
            data_manager.folder_download(final_one_video)
        # 파일 다운로드
        else:
            data_manager.file_download(download_list)



        return HttpResponse("download")


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

