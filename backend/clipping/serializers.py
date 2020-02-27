from .models import VideoInfo
from rest_framework import serializers

class VideoInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = VideoInfo
        fields = ('id','videoId','keyword','startTime','endTime','created_at')