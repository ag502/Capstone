from django.db import models
from django.conf import settings
from pytz import timezone

# Create your models here.

# 모델 선택된 비디오 데이터


class VideoData(models.Model):
    id = models.AutoField(primary_key=True)
    videoId = models.CharField(max_length=11)
    keyword = models.CharField(max_length=300, null=True)
    startTime = models.IntegerField(null=True)
    endTime = models.IntegerField(null=True)
    model_tag = models.CharField(max_length=300, null=True)
    video_number = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def created_at_korean_time(self):
        korean_timezone = timezone(settings.TIME_ZONE)
        return self.created_at.astimezone(korean_timezone)

    def __str__(self):
        return "{}_{}".format(self.videoId, self.created_at)