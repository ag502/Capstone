# Capstone - django

#### todo

- [x] 초기환경 셋팅
  - [x] requirements.txt 만들기
  
- [x] aws 연결
  - [x] rds 연결
  - [x] s3 연결
  
- [x] react django 연결

- [x] clipping App 
  - [x]  VideoInfo model 생성
  - [x]  view 만들기
    - [x]  Clipping 영상 다운로드 만들기
    - [x]  ffmpeg 썸네일 만들기
    - [x]  Clip 완료여부 데이터베이스 만들기
  - [ ]  병렬처리
    
- [x] preprocesser App
  - [x]  VideoInfo model 불러오기
  - [ ]  preprocesser model 만들기
      - [ ] model별 전처리 작업
  - [x]  view 만들기
      - [x]  영상 선택시 모델 태그 설정
      - [x]  모델 선택 영상 저장 기능 만들기
      - [x]  클리핑된 영상 삭제 기능 만들기
      - [x]  필요한 구간 찾아내서 리스트로 만들기
      
- [ ] data App
  - [ ]  preprocesser model 불러오기
  - [ ]  view 만들기
      - [ ]  로컬에 저장 기능 만들기
      - [ ]  모델 선택 영상 삭제 기능 만들기
      
- [ ] model App
  - [ ] view 만들기
  - [ ] add model 기능
  - [ ] model 적용
      

***
#### Clip Video Download (backend)

1. backend/clipping/views.py 에서 output_dir = '' 부분의 경로를 로컬 저장소로 변경합니다.
<div>
  <img width="602" alt="스크린샷 2020-03-05 오후 4 18 46" src="https://user-images.githubusercontent.com/46099115/75957289-0e6d4380-5efd-11ea-9e66-3744cc087aa0.png">
<div/>
  
2. output_dir 디렉토리 안에 ffmpeg 실행 파일을 다운받아 저장합니다.
<div>
  <img width="851" alt="스크린샷 2020-03-05 오후 4 11 34" src="https://user-images.githubusercontent.com/46099115/75957142-bafaf580-5efc-11ea-871b-38c1ee6a2312.png">
<div/>

3. 클리핑할 영상의 시간을 지정하고 Clipping 버튼을 누르면 저장 됩니다.
- Clipping 된 영상의 이름은 videoId.startTime-endTime.mp4 로 저장 됩니다.
  ex)iR_dSg7T-fA.49-97.mp4
  
#### backend DB 확인
1. 장고서버를 실행합니다.

2. http://127.0.0.1:8000/admin/ 으로 접속합니다.
- ID : Animo
- Password : Animo3015

3. 확인 하고싶은 APP으로 접속해 DB를 확인합니다.

***

   
    




---

#### description

