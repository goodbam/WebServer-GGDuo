# 실행 전 필수 설정

### 모듈 셋팅

###### 1.모듈 설치 경로로 이동

- cd {사용자 경로}/app

###### 2.모듈 설치

- npm install

### 환경 변수 설정

###### 1.환경 변수를 저장할 파일 생성

- {사용자 경로}/app/.env 파일 생성

###### 2.env 파일을 열고 필수 변수 등록

- value 부분은 문자열로 따로 묶지 않는다. ex) SERVER_PORT = "127.0.0.1" (X) -> SERVER_PORT = 127.0.0.1 (O)
- 입력해야 하는 필수 변수 목록  
  SERSERVER_PORT = {원하는 포트 번호}
  DB_HOST = {DB IP 주소}  
  DB_PORT = {DB 접속 Port}  
  DB_USER = {DB 접속 계정}  
  DB_PASSWORD = {DB 접속 계정 비밀번호}  
  DB_DATABASE = {DB 이름}   
  ACCESS_SECRET = {서버 개인키}   
  REFRESH_SECRET = {서버 개인키}

---

### 데이터 베이스 접속 테스트

###### 테스트 코드 주석 해제

- {사용자 경로}/app/src/config/db.js 파일 열기
- 22~30번줄까지 주석 해제

###### db.js 파일 실행

- node {사용자 경로}/app/src/config/db.js

###### 터미널에서 로그 확인

- 실패 시 : "Error: 에러 메세지" 출력
- 성공 시 : "DB 접속 성공" 출력
