# 목차
1. 프로젝트 개요
 - 기획 배경
 - 주요 기능
 - 주요 기술 스택
 - 아키텍처

2. 팀 소개
 - 팀원 소개
 - 협업 툴
 - 협업 환경

3. 산출물
 - 와이어 프레임(초기)
 - 기능 명세서
 - API
 - ERD
 - Notion

4. 결과물
 - 중간 발표 자료
 - 최종 발표 자료
 - 포팅 매뉴얼
 - 최종 빌드 파일



# 프로젝트 개요

---



## 프로젝트 진행 기간

---

- 2022.10.10(월) - 2022.11.25(금)
- SSAFY 7기 2학기 자율프로젝트



## 기획 배경

---

- 개발자를 꿈꾸는 사람 혹은 현직 개발자들은 ‘1일 1커밋’ 이라는 말을 한번 쯤 들어보았을 것이다. 깃에서 제공하는 잔디밭(Git Contribution)에 색을 채우기 위해 하루에 적어도 한번씩 커밋을 하는 활동이다.  ‘MOTI’ 프로젝트는 매일 꾸준히 ‘1일 1커밋’을 실천하는 사람들에게 동기부여(Motivation)를 하고 소소한 재미를 주기 위해 시작되었다.



## 주요 기능

---
- Git Oauth2 deviceflow를 통한 로그인
    1. Git ClientID를 통해 deviceID와 8자리 userCode 발급
    2. 사용자는 Github로그인 후 화면의 8자리 코드를 따라 입력
    3. 사용자가 올바른 코드를 입력하면 Git Server에 deviceID를 보내 Git AccessToken을 요청
    4. Git AccessToken을 Moti Server로 보내 Moti Access Token을 발급받아 로그인
- 0단계부터 4단계까지 성장하는 모티
    - 2→3단계 진화 시 두 가지 모습 중 하나로 진화할 수 있어요. (10%확률로 용이 될 수 있습니다.)
    - 0단계 2일, 1단계 5일, 2단계 1주일, 3단계 2주일 총 4주의 성장 과정
    - 매일 12시 서버에서 모티 밥였는 지, 진화할 것인 지
- Git API를 통해 커밋로그를 조회하여 모티 밥주기
    - 하루에 한번만 먹여도 모티는 잘 자라요.
    - 밥먹이기를 하면 기본으로 토큰1개를 얻을 수 있어요.
        - 기본1개 + 추가 커밋당 1개씩 최대 3개 획득 가능해요.
- 놀아주기와 씻겨주기로 모티의 애정도 상승
    - 애정도는 하루에 최대 5번 올릴 수 있어요
    - 애정도는 2→3단계 분기 진화 확률에 영향을 줘요.
        - 기본확률은 10%로 용으로 진화할 수 있고 애정도에 따라 최대 20%까지 높일 수 있어요.
- 상태창, 상점, 인벤토리, 랭킹, 명예의 전당 등 다양한 컨텐츠
    - 상태창 : 모티의 이름, 성별, 포만감, 애정도, 생년월일 조회해요.
    - 상점 : ‘알로초’, ‘이름표’, ‘비상식량’ 아이템들을 구매 가능해요.
        - **‘알로초’** : 1단계 이상의 단계에서 0단계 알 상태로 돌아가는 아이템이에요.
        - **‘이름표’** : 모티의 이름을 변경시켜주는 아이템이에요.
        - **‘비상식량’** : 오늘 밥주기를 깜빡한 사용자를 위해 모티가 챙겨먹을 수 있는 밥 아이템이에요.
    - 인벤토리 : 구매한 아이템을 확인하고 사용하는 곳이에요.
    - 랭킹 : 생존일과 애정도를 기준으로 순위를 매겨 다른 사용자들의 모티 조회하고 나의 등수를 확인할 수 있어요.
    - 명예의 전당 : 사용자가 지금까지 키웠던 모티들의 기록을 볼 수 있어요.
    - 환경설정 : 로그아웃, 회원탈퇴, 모티기기와 버튼 색상을 변경할 수 있어요.



## 기술 스택

---

- Server: AWS EC2 Ubuntu 20.04 LTS
- Java: open-JDK 11
- Spring-boot: 2.7.5
- Jenkins: 2.361.2
- Docker: 20.10.20
- MariaDB: 10.6.8
- MongoDB: 6.0.3
- Storage: AWS S3
- node.js: 16.18.0
- Electron: 21.2.0
- React: 18.2.0
- Recoil: 0.7.6
- TypeScript: 4.8.4
- styled-components: 5.3.6
- Nginx: 1.18.0
- VSCode: Stable Build
- IntelliJ version: 22.1.3
- DataGrip: 22.2.4
- SSH client: MobaXterm
- API Test: Swagger


## 시스템 아키텍처

---

![image](https://user-images.githubusercontent.com/34851254/204143341-e27c79e5-e344-4bb2-8311-a2065cd43c6b.png)



## 

# 팀 소개

---



## 팀원 소개 

---

- 조민서: 팀장
- 전종민: 팀원
- 김영훈: 팀원
- 황석영: 팀원
- 이지수: 팀원
- 최진우: 팀원



## 역할 분배

---

![image](https://user-images.githubusercontent.com/34851254/204143268-7148e71b-ea42-4d37-bb44-ad9289170018.png)

![image](https://user-images.githubusercontent.com/34851254/204143302-85427c7d-da58-4458-a381-d82a1152fc99.png)



## 협업 툴 및 환경

---

- Jira
  - 매주 월요일 1주 단위 스프린트 시작
- Git
  - 컨벤션 설정
  - 같은 역할의 팀원을 Reviewer로 지정하여 코드 리뷰 진행
- Mattermost
- Notion
  - 개발일지, 회의 등 모든 작업 진행
  - 매일 오전 Scrum 회의 기록
- Webex
  - 매일 프로젝트 진행
  - 필요한 경우 세부세션 활용하여 세부 단위 별 진행





# 산출물

---



## 프로젝트 산출물

---

### 스토리보드 및 와이어 프레임

![image](https://user-images.githubusercontent.com/34851254/204143826-afbbd2e4-eaae-430d-b77e-a0e17b519714.png)

### API 명세서

![image](https://user-images.githubusercontent.com/34851254/204143671-8c076c4f-6853-4b4b-93cd-97b85265b657.png)
![image](https://user-images.githubusercontent.com/34851254/204143685-80f8038d-336d-4bfc-920b-cf20501ca5b8.png)
![image](https://user-images.githubusercontent.com/34851254/204143698-8469a379-686b-4c30-bb15-634e9731d0d9.png)

### ERD

![GitMoti](https://user-images.githubusercontent.com/34851254/204143575-956e073d-cd64-4bdd-b0f7-37507d7d39d3.png)




## 프로젝트 결과물

---

- 포팅 매뉴얼
- 중간발표자료
- 최종발표자료



