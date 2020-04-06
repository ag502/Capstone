from .models import VideoData
from rest_framework import serializers


class VideoDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoData
        fields = ('id', 'videoId', 'keyword', 'startTime', 'endTime', 'model_tag',
                  'created_at', 'video_number', 'final_save')

