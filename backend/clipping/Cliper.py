import os
import youtube_dl
import boto3
from config.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME

BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"

s3 = boto3.resource(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)
bucket = s3.Bucket(AWS_STORAGE_BUCKET_NAME)


def clip_download(output_dir, videoId):  # 클리핑 하려는 동영상의 비디오아이디로 원본을 받음

    video_url = BASE_YOUTUBE_URL % videoId
    # download_path = os.path.join(output_dir, '%(id)s_%(title)s.%(ext)s')
    download_path = os.path.join(output_dir, '%(id)s_.%(ext)s')  # 파일이름설정
    ydl_opts = {
            'format': 'best/best',  # 가장 좋은 화질로 선택(화질을 선택하여 다운로드 가능)
            'outtmpl': download_path,  # 다운로드 경로 설정
            # 'writesubtitles': 'best',  # 자막 다운로드(자막이 없는 경우 다운로드 X)
            # 'writethumbnail': 'best',  # 영상 thumbnail 다운로드
            # 'writeautomaticsub': True,  # 자동 생성된 자막 다운로드
            # 'subtitleslangs': 'ko'  # 자막 (다른 언어로 변경 가능)
        }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])


def clip_section(output_dir, videoId, startTime, endTime):  # 클리핑 영상의 설정시간으로 자름
    os.chdir(output_dir)
    if startTime == 0 and endTime == 0:
        os.rename('%s_.mp4' % videoId, '%s_0-0.mp4' % videoId)
        print("0초")
    else:
        ffmpeg_command = "ffmpeg -i %s_.mp4 -ss %d -t %d %s_%d-%d.mp4" \
                    % (videoId, startTime, endTime-startTime, videoId, startTime, endTime)
        os.system(ffmpeg_command)
        os.remove('%s_.mp4' % videoId)  # 변환되면 기존영상은 삭제


    # s3에 올리기

    s3_Path = 'clippingVideo/%s_%d-%d.mp4' % (videoId, startTime, endTime)
    s3.Object(bucket.name, s3_Path).upload_file('%s_%d-%d.mp4' % (videoId, startTime, endTime))

    return print("클 리 핑 완 료")


# 썸네일 생성
def createThumbnail(output_dir, thumbnail_dir, videoId, startTime, endTime):
    os.chdir(thumbnail_dir)
    ffmpegThumbnail = "ffmpeg -i %s_%d-%d.mp4 -ss 00:00:00 -vcodec png -vframes 1 %s_%d-%d.png" \
                      % (output_dir+videoId, startTime, endTime, videoId, startTime, endTime)
    os.system(ffmpegThumbnail)

    # s3에 올리기
    s3_Path = 'thumbnails/%s_%d-%d.png' % (videoId, startTime, endTime)
    s3.Object(bucket.name, s3_Path).upload_file('%s_%d-%d.png' % (videoId, startTime, endTime))


def removeFile(output_dir, thumbnail_dir, videoId, startTime, endTime):  # s3에 올린후 파일 제거
    os.chdir(output_dir)
    os.remove('%s_%d-%d.mp4' % (videoId, startTime, endTime))

    os.chdir(thumbnail_dir)
    os.remove('%s_%d-%d.png' % (videoId, startTime, endTime))

    # # s3에 올리기
    # s3_Path = 'thumbnails/%s_%d-%d.png' % (videoId, startTime, endTime)
    # s3.Object(bucket.name, s3_Path).upload_file('%s_%d-%d.png' % (videoId, startTime, endTime))


