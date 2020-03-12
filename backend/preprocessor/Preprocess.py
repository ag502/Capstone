import os
import youtube_dl
BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"
import boto3
from config.settings import AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_STORAGE_BUCKET_NAME

s3 = boto3.resource(
        's3',
        aws_access_key_id = AWS_ACCESS_KEY_ID,
        aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
)
bucket = s3.Bucket(AWS_STORAGE_BUCKET_NAME)


def original_delete(output_dir, thumbnail_dir, videoId, startTime, endTime):  # 원본영상, 썸네일 삭제
    os.chdir(output_dir)
    os.remove('%s_%d-%d.mp4' % (videoId, startTime, endTime))

    os.chdir(thumbnail_dir)
    os.remove('%s_%d-%d.png' % (videoId, startTime, endTime))