import os
import youtube_dl


def clip_download(output_dir, videoId): #클리핑 하려는 동영상의 비디오아이디로 원본을 받음
    download_path = os.path.join(output_dir, '%(id)s-%(title)s.%(ext)s')
    youtube_video_list = ["https://www.youtube.com/watch?v=" + videoId,
    ]
    print(youtube_video_list)
    for video_url in youtube_video_list:

        # youtube_dl options
        ydl_opts = {
            'format': 'best/best',  # 가장 좋은 화질로 선택(화질을 선택하여 다운로드 가능)
            'outtmpl': download_path,  # 다운로드 경로 설정
            'writesubtitles': 'best',  # 자막 다운로드(자막이 없는 경우 다운로드 X)
            'writethumbnail': 'best',  # 영상 thumbnail 다운로드
            'writeautomaticsub': True,  # 자동 생성된 자막 다운로드
            'subtitleslangs': 'ko'  # 자막 (다른 언어로 변경 가능)
        }

        try:
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download([video_url])
        except Exception as e:
            print('error', e)

# def clip_section(startTime, endTime, now_dir, output_dir): #클리핑 하려는 동영상의 원본을 가지고 사용자가 원하는 구간에 맞게 자름

