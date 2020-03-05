# Capstone

#### todo

- [x] 키워드 검색시 관련 영상 제목, 채널, 업로드 날짜, 썸네일 불러오기
- [x] 채널 클릭시 해당 채널의 영상 목록 페이지로 이동
- [x] 채널을 제외한 부분 클릭시 비디오 재생 팝업 실행
- [x] 클리핑할 구간 지정하는 slider 구현
- [x] 유튜브 api nextPageToken 구현
- [x] 채널 아이디 별 검색 기능 추가
- [x] 비디오 아이디 별 검색 기능 추가
- [x] react router 수정
- [x] 검색 결과 없거나 error response 받을 시 검색결과 없음 페이지 렌더링
- [ ] 비디오 재생 팝업 우측하단 cliping 클릭시 server에 post 요청
  - [x] cliping 요청시 post 할 정보에 videoid, keyword 추가
- [ ] react Hooks life cycle을 이용해 불필요 한 rendering 방지

* * *
###### 모델 기능
- [ ] Overview 작성
- [ ] 원하는 모델 선택해서 TEST 가능하도록
- [ ] Add Model 기능

---

#### description

##### Initial Screen

![1](https://user-images.githubusercontent.com/35404137/74447544-e4f06780-4ebc-11ea-8e93-1b92aeac49b9.JPG)

##### After Searching Keyword

![2](https://user-images.githubusercontent.com/35404137/74447881-62b47300-4ebd-11ea-8691-84ad54d77965.JPG)

##### Play Video

![3](https://user-images.githubusercontent.com/35404137/74448044-a60ee180-4ebd-11ea-8f1a-529fd79f90ae.JPG)

---

`src/util/axios` 에서 api key값을 바꿔 사용하면 됩니다.

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
###
