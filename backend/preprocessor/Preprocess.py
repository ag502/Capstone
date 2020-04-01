import os
import glob
import boto3
from config.settings import AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_STORAGE_BUCKET_NAME

s3 = boto3.resource(
        's3',
        aws_access_key_id = AWS_ACCESS_KEY_ID,
        aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
)
bucket = s3.Bucket(AWS_STORAGE_BUCKET_NAME)

path = "https://aws-s3-capstone.s3.ap-northeast-2.amazonaws.com/clippingVideo/"

# "C:/Users/jaehee/capstone/Material_Ui_Capstone/backend/preprocessor/frames/"
# "C:/Users/LG/Desktop/Material_Ui_Capstone/public/frames"
# "/Users/zigje9/Desktop/jenesis/public/frames/"

frames_dir = "/Users/zigje9/Desktop/jenesis/public/frames/"


# 프레임 생성
def createframes(videoId, startTime, endTime):
    #s3에서 영상 가져온다.
    # s3_Path = 'clippingVideo/%s_%d-%d.mp4' % (videoId, startTime, endTime)
    # s3.Object(bucket.name, s3_Path).download_file('%s_%d-%d.mp4' % (frames_dir+videoId, startTime, endTime))

    os.chdir(frames_dir)
    # path + videoId, startTime, endTime, endTime - startTime, endTime - startTime
    ffmpeg_command = "ffmpeg -i %s_%d-%d.mp4 -ss 00:00:00 -t %d -r 1 -vframes %d -vcodec bmp %s.bmp" % (frames_dir+videoId,startTime,endTime,endTime-startTime,endTime-startTime,"%03d")
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
    numbers = []
    if not time_section:
        os.remove('%s_%d-%d.mp4' % (videoId, start_time, end_time))
    else:
        for time in time_section:
            numbers.append(i)
            ffmpeg_command = "ffmpeg -i %s_%d-%d.mp4 -ss %d -t %d %s_%s_%d-%d_%d.mp4" \
                             % (videoId,start_time, end_time, time[0], time[1] - time[0], model_tag,videoId, start_time, end_time,i)
            ffmpegThumbnail = "ffmpeg -i %s_%s_%d-%d_%d.mp4 -ss 00:00:00 -vcodec png -vframes 1 %s_%s_%d-%d_%d.png" \
                              % (model_tag, videoId, start_time, end_time, i, model_tag, videoId, start_time, end_time, i)

            os.system(ffmpeg_command)
            os.system(ffmpegThumbnail)

            i += 1
        os.remove('%s_%d-%d.mp4' % (videoId, start_time, end_time))

    #s3에 영상 올리기
    # for num in range(i):
    #     s3_Path = '%s/%s_%s_%d-%d_%d.mp4' % (model_tag,model_tag,videoId, start_time, end_time,num)
    #     s3.Object(bucket.name, s3_Path).upload_file('%s_%s_%d-%d_%d.mp4' % (model_tag,videoId, start_time, end_time,num))
    #     s3_thumbnail_Path = '%s/thumbnails/%s_%s_%d-%d_%d.png' % (model_tag,model_tag, videoId, start_time, end_time, num)
    #     s3.Object(bucket.name, s3_thumbnail_Path).upload_file(
    #         '%s_%s_%d-%d_%d.png' % (model_tag, videoId, start_time, end_time, num))

    #frame 폴더 파일 삭제
    frame_list = makelist()
    for frame in frame_list:
        os.remove('%s' % frame)
    # for num in range(i):
    #     os.remove('%s_%s_%d-%d_%d.mp4' % (model_tag, videoId, start_time, end_time, num))
    #     os.remove('%s_%s_%d-%d_%d.png' % (model_tag, videoId, start_time, end_time, num))

    return numbers

#def original_delete(output_dir, thumbnail_dir, videoId, startTime, endTime):  # 원본영상, 썸네일 삭제
    # os.chdir(output_dir)
    # os.remove('%s_%d-%d.mp4' % (videoId, startTime, endTime))
    #
    # os.chdir(thumbnail_dir)
    # os.remove('%s_%d-%d.png' % (videoId, startTime, endTime))

    # s3_Path = 'clippingVideo/%s_%d-%d.mp4' % (videoId, startTime, endTime)
    # s3.Object(bucket.name, s3_Path).delete()
