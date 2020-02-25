# Capstone

#### todo

- [x] 키워드 검색시 관련 영상 제목, 채널, 업로드 날짜, 썸네일 불러오기
- [x] 채널 클릭시 유튜브 사이트 채널로 이동 -> 채널 클릭시 해당 채널의 영상 목록 페이지로 이동
- [x] 채널을 제외한 부분 클릭시 비디오 재생 팝업 실행
- [x] 클리핑할 구간 지정하는 slider 구현
- [x] 유튜브 api nextPageToken 구현
- [x] 채널 아이디 별 검색 기능 추가
- [x] 비디오 아이디 별 검색 기능 추가
- [x] react router 수정
- [ ] 비디오 재생 팝업 우측하단 cliping 클릭시 server에 post 요청
  - [x] cliping 요청시 post 할 정보에 videoid, keyword 추가
- [ ] react Hooks life cycle을 이용해 불필요 한 rendering 방지
- [ ] `layouts/Dashboard/Topbar.js` 에서 `processVideoData` redux thunk로 변환

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

`src/compoents/Video/` 에서 clipping 요청을 server로 보냅니다.
