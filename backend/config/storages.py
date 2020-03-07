from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class ClippingVideoStorage(S3Boto3Storage):
    location = settings.CLIPPINGVIDEO_LOCATION

class ThumnailStorage(S3Boto3Storage):
    location = settings.THUMNAIL_LOCATION
