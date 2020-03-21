import os
import youtube_dl
import glob
BASE_YOUTUBE_URL = "https://www.youtube.com/watch?v=%s"
import boto3

# from config.settings import AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_STORAGE_BUCKET_NAME
#
# s3 = boto3.resource(
#         's3',
#         aws_access_key_id = AWS_ACCESS_KEY_ID,
#         aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
# )
# bucket = s3.Bucket(AWS_STORAGE_BUCKET_NAME)

path = "https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/"
frames_dir = "C:/Users/jaehee/capstone/Material_Ui_Capstone/backend/preprocessor/frames/"

# 프레임 생성
def createframes(videoId, startTime, endTime):
    #s3에서 영상 가져온다.
    # s3_Path = 'clippingVideo/%s_%d-%d.mp4' % (videoId, startTime, endTime)
    # s3.Object(bucket.name, s3_Path).download_file('%s_%d-%d.mp4' % (frames_dir+videoId, startTime, endTime))

    os.chdir(frames_dir)
    ffmpeg_command = "ffmpeg -i %s_%d-%d.mp4 -ss 00:00:00 -t %d -r 1 -vframes %d -vcodec bmp %s.bmp" % (path+videoId,startTime,endTime,endTime-startTime,endTime-startTime,"%03d")
    os.system(ffmpeg_command)

# 구간 생성
def makelist():
    file_list = glob.glob(frames_dir+'*')
    file_list_bmp = [file for file in file_list if file.endswith(".bmp")]
    return file_list_bmp

# 구간 리스트 받아서 영상 자르기
def time_clip(model_tag,videoId,time_section,start_time,end_time):
    os.chdir(frames_dir)
    i=0
    if not time_section:
        os.remove('%s_%d-%d.mp4' % (videoId, start_time, end_time))
    else:
        for time in time_section:
            ffmpeg_command = "ffmpeg -i %s_%d-%d.mp4 -ss %d -t %d %s_%s_%d-%d_%d.mp4" % (videoId,start_time, end_time, time[0], time[1] - time[0], "modeltag",videoId, start_time, end_time,i)
            i+=1
            os.system(ffmpeg_command)
        os.remove('%s_%d-%d.mp4' % (videoId, start_time, end_time))

    #s3에 영상 올리기
    # for num in range(i):
    #     s3_Path = 'faceemotion/%s_%s_%d-%d_%d.mp4' % ("modeltag",videoId, start_time, end_time,i)
    #     s3.Object(bucket.name, s3_Path).upload_file('%s_%s_%d-%d_%d.mp4' % ("modeltag",videoId, start_time, end_time,i))


def original_delete(output_dir, thumbnail_dir, videoId, startTime, endTime):  # 원본영상, 썸네일 삭제
    os.chdir(output_dir)
    # os.remove('%s_%d-%d.mp4' % (videoId, startTime, endTime))
    #
    # os.chdir(thumbnail_dir)
    # os.remove('%s_%d-%d.png' % (videoId, startTime, endTime))

    # s3_Path = 'clippingVideo/%s_%d-%d.mp4' % (videoId, startTime, endTime)
    # s3.Object(bucket.name, s3_Path).delete()
