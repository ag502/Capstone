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
- [x] 비디오 전처리 화면 관리 페이지
- [x] redux-thunk 

- [ ] 모델 기능
  - [x] 모델 페이지 화면 구성
  - [ ] 원하는 모델 선택해서 TEST 가능하도록
  - [ ] Add Model 기능
  - [ ] 각 모델별 화면 구성
  

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
