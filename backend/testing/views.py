from preprocessor.models import VideoData
from preprocessor.serializers import VideoDataSerializer
from rest_framework.views import APIView
from django.http import JsonResponse

class Testing(APIView):
    def get(self, request, model):
        video_data = VideoData.objects.filter(model_tag=model, final_save=True)
        video_fields = video_data.values('videoId', 'startTime', 'endTime', 'keyword', 'created_at', 'video_number').distinct()
        serializer = VideoDataSerializer(video_fields, many=True)

        return JsonResponse(serializer.data, safe=False)

