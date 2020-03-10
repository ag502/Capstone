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

