# Todolist-Projects
투두리스트 웹사이트 - 리액트 프로젝트


## 💻 프로젝트 소개
할 일을 추가하고 관리할 수 있는 반응형 투두리스트 웹사이트


## ⏱ 개발 기간
22년 12월 1일 - 22년 12월 19일


## ⚙ 기술 스택
<img src="https://img.shields.io/badge/REACT-000000?style=for-the-badge&logo=React&logoColor=61DAFB"> <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/STYLEDCOMPONENTS-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">


## 📌 주요 기능
#### ✔ localStorage를 사용한 데이터 관리
- todo key 생성 및 todo 데이터 관리
- todoTitle key 생성 및 타이틀 관리
#### ✔ context API를 사용한 상태 관리
- 할 일 상태 관리 - [TodoContext.tsx](https://github.com/InnSeonn/Todolist-Projects/blob/main/src/contexts/TodoContext.tsx)
- 새로운 할 일 관리 - [NewTodoContext.tsx](https://github.com/InnSeonn/Todolist-Projects/blob/main/src/contexts/NewTodoContext.tsx)
- 정렬 버튼 관리 - [ToggleContext.tsx](https://github.com/InnSeonn/Todolist-Projects/blob/main/src/contexts/ToggleContext.tsx)

---------------------------

### 새로운 할 일 추가
- 동시에 하나의 새로운 할 일만 추가 가능
- 오늘 날짜로 생성
- context 업데이트
- 텍스트가 입력되면 localStorage에 추가

### 할 일 수정
- 텍스트 수정
  - 여러 줄의 텍스트 입력 가능
  - 빈 값이 아니고 변경 사항이 있는 경우만 context 및 localStorage 업데이트
- 날짜 선택
  - react-datePicker 사용
  - 오늘을 기준으로 상대적 날짜 표시
  - 날짜 오름차순으로 할 일 정렬
  - 변경 사항이 있는 경우만 context 및 localStorage 업데이트
- 완료 여부
  - 체크박스를 클릭하여 완료 여부 수정
  - 완료된 할 일은 하단으로 이동
  
### 할 일 삭제
- 휴지통 버튼을 클릭하여 해당 할 일만 삭제

### 타이틀 설정
- 타이틀을 클릭하여 할 일 목록의 제목 작성

### 날짜에 따라 할 일 정렬
- 필터 토글 버튼 ON : 오늘, 다음, 지난, 완료된 할 일로 구분
- 필터 토글 버튼 OFF : 해야할 일, 완료된 할 일로 구분

### 완료 여부에 따라 할 일 표시
- 체크 토글 버튼 ON : 완료된 할 일 표시
- 체크 토글 버튼 OFF : 완료된 할 일 미표시
