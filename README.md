![project_900_1](https://user-images.githubusercontent.com/117163085/221344807-f0f3eb5f-dc90-4339-b530-ab2a8df576f4.png)

<br/>

# Todolist-Projects
할 일을 추가하고 관리할 수 있는 반응형 투두리스트 웹사이트

<br/>

## 💻 프로젝트 소개
할 일을 추가, 수정, 삭제하여 관리할 수 있는 **투두리스트** 웹사이트입니다.

할 일을 쉽게 관리하기 위해서 최대한 적은 클릭으로 기능이 이루어지도록 했습니다.

**캘린더로 직관적인 날짜 선택**이 가능하고 일주일 전후의 가까운 날짜는 상대적으로, 올해 날짜는 월일만 표시하여 데드라인을 쉽게 파악할 수 있습니다.

날짜에 따라 **오늘, 지난, 다음 할 일로 구분**하거나 완료 여부에 따라 **해야할 일, 완료된 할 일로 구분** 할 수 있습니다.

색상, 투명도, 중앙선 등을 활용하여 할 일의 상태를 직관적으로 표현했습니다.

자신만의 투두리스트 **제목을 설정**할 수 있습니다. 목표를 적어도 좋고, 공백으로 비워둘 수도 있습니다.

미디어쿼리를 사용하여 **반응형**으로 제작했습니다.

<br/>

## ✨ 배포사이트
https://inn-todolist.vercel.app/

<br/>

## ⏱ 개발 기간
22년 12월 1일 - 22년 12월 19일

<br/>

## ⚙ 기술 스택
<img src="https://img.shields.io/badge/REACT-000000?style=for-the-badge&logo=React&logoColor=61DAFB"> <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/STYLEDCOMPONENTS-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GitHub&logoColor=white">

- **`React`** : useEffect, useRef, useState, useMemo 등 React Hooks을 활용하여 할 일이 추가, 수정, 삭제되면 리렌더링을 통해 관련 요소에 동시적으로 UI 업데이트가 이루어지도록 했습니다.
- **`Typescript`** : 타입을 명시하여 코드 작성 단계에서 버그를 예방하고 변수나 함수 등의 목적을 명확하게 하여 안전한 코드를 작성할 수 있도록 했습니다.
- **`Styled-Components`**, **`HTML5`** : JSX를 사용하는 리액트의 특성을 살려 CSS-in-JS 방식의 styled-components를 사용하여 컴포넌트의 구조, 기능, 디자인을 하나의 파일로 파악할 수 있도록 했습니다.
- **`Context API`** : 대부분의 컴포넌트에서 접근하는 ‘할 일 · 새로운 할 일 · 토글 버튼 상태’ 데이터를 효율적으로 다루기 위해 context API를 사용했습니다.
- **`LocalStorage`** : 할 일 데이터와 제목을 로컬스토로지에 저장했습니다.
- **`React-Datepicker`** : UI 수정이 쉬운 react-datepicker 라이브러리를 사용하여 직관적이고 간편하게 날짜를 선택할 수 있게 했습니다.
- **`React-Icons`** : 버튼에 필요한 아이콘을 사용했습니다.
- **`Git`**, **`Github`**, **`SourceTree`** : Git을 통해 소스코드를 관리했습니다. 주로 SourceTree를 통해 commit할 파일 또는 라인을 add 하고, CLI로 commit, push 하여 작업했습니다.
- **`Vercel`** : Vercel에 Git Repository를 연동하여 웹사이트를 배포했습니다.

<br/>

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

### 제목 설정
- 타이틀을 클릭하여 할 일 목록의 제목 작성

### 날짜에 따라 할 일 정렬
- 필터 토글 버튼 ON : 오늘, 다음, 지난, 완료된 할 일로 구분
- 필터 토글 버튼 OFF : 해야할 일, 완료된 할 일로 구분

### 완료 여부에 따라 할 일 표시
- 체크 토글 버튼 ON : 완료된 할 일 표시
- 체크 토글 버튼 OFF : 완료된 할 일 미표시

<br/>

https://user-images.githubusercontent.com/117163085/221344798-61f3c548-32da-49f8-a85b-6debb447b344.mp4
