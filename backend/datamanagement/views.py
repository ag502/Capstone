from preprocessor.models import VideoData
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse


class DataDelete(APIView):
    @staticmethod
    def post(request):
        clip_info = request.data
        print(request.data)
        # video_id = str((clip_info['videoId']))
        # key_word = str((clip_info['keyword']))
        # start_time = int(clip_info['startTime'])
        # end_time = int(clip_info['endTime'])

        # 전처리된 영상 DB 삭제
        # queryset = VideoData.objects.all()
        # queryset = queryset.filter(videoId=video_id, keyword=key_word, startTime=start_time, endTime=end_time)
        # queryset.delete()


        return HttpResponse("delete")
