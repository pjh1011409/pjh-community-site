# 🐶 POP(Prod of pets) 🐱
<strong>애완동물을 자랑스럽게!</strong>
<strong>자신의 펫을 마음껏 자랑하고, 펫지식을 공유해보세요!</strong>

---

# 🗓 프로젝트 기간

2022.11.18 ~ 2022.12.18

# 📎 Links
- Project homepage: 

---
# 💻 Service Architecture

<img width="800" alt="POP Structure" src="https://user-images.githubusercontent.com/81337674/208282368-622266b2-aa26-451f-95f5-412053261077.png">


---

# 📄 Project Architecture

#### Client

```
⭐️ src
|
├── 🗂 pages
│    │ 
│    ├── 📄 _app.tsx
│    ├── 📄 index.tsx
│    ├── 📄 login.tsx
│    ├── 📄 register.tsx
│    │ 
│    ├── 🗂 r
│    │   ├── 🗂 [sub]
│    │   │    ├── create.tsx
│    │   │    └── 🗂 [identifier] ─ 📄 [slug].tsx   
│    │   └── 📄 [sub].tsx      
│    │    
│    ├── 🗂 subs - 📄 create.tsx
│    └── 🗂 u - 📄 [username].tsx
│
├── 🗂 context ── auth.tsx
│   
├── 🗂 components 
│   │
│   ├── 🗂 common
│   │     ├── 📄 InputGroup.tsx
│   │     ├── 📄 Navbar.tsx     
│   │     ├── 📄 PostCard.tsx
│   │     └── 📄 Shimmer.tsx
│   ├── 🗂 mainPage
│   │     ├── 📄 Introduce.tsx
│   │     ├── 📄 PostList.tsx     
│   │     ├── 📄 Search.tsx
│   │     ├── 📄 Slider.tsx
│   │     └── 📄 SideBar.tsx
│   ├── 🗂 postPage
│   │     ├── 📄 CreateForm.tsx
│   │     ├── 📄 CreateImage.tsx     
│   │     ├── 📄 Contents.tsx
│   │     ├── 📄 CreateComment.tsx
│   │     └── 📄 CommentList.tsx
│   ├── 🗂 subPage
│   │     ├── 📄 SubBar.tsx
│   │     └── 📄 SubHeader.tsx
│   └── 🗂 userPage
│         ├── 📄 Comments.tsx
│         └── 📄 UserInfo.tsx      
│  
├── 🗂 types - 📄 types.tsx
│
└── 🗂 styles - 📄 globals.css
```
#### Server
```
⭐️ src
|
├── 📄 data-source.ts
├── 📄 server.ts
|
├── 🗂 entities 
│    ├── 📄 Entity.ts
│    ├── 📄 Sub.ts
│    ├── 📄 Post.ts
│    ├── 📄 Comment.ts
│    ├── 📄 Vote.ts
│    └── 📄 User.ts
│
├── 🗂 routes 
│    ├── 📄 auth.ts
│    ├── 📄 posts.ts
│    ├── 📄 subs.ts
│    ├── 📄 users.ts
│    └── 📄 votes.ts
│       
├── 🗂 middlewares 
│    ├── 📄 auth.ts
│    └── 📄 user.ts
│
└── 🗂 utils - 📄 helpers.tsx
```


# ⚙️ 주요 기능 

- ##### 회원가입, 로그인 및 인증 🔐
  

- ##### 커뮤니티 🌈
  - 로그인시 커뮤니티를 생성 가능
  - 중복되는 이름의 커뮤니티는 생성할 수 없도록 유효성 검증
  - 커뮤니티마다 게시글을 생성 가능
  - 커뮤니티 프로필 이미지와 배너 이미지를 선택적으로 업로드 가능
  - 본인이 생성한 커뮤니티에 한해서 수정, 삭제 가능

- ##### 게시글 ✏️ 
  - 로그인시 게시글을 생성 가능
  - 게시글에 선택적으로 이미지 업로드 가능
  - 본인이 작성한 게시글에 한해서 삭제 가능

- ##### 댓글 달기 💬
  - 로그인시 게시글마다 댓글 작성 가능

- ##### 투표하기 👍 
  - 게사글, 댓글에 좋아요 누르기 가능

- ##### 검색하기 🔍 
  - 메인페이지에서 전체 게시글에 대한 검색이 가능
  - 검색시 입력한 텍스트에 대한 데이터에 하이라이트 출력

- ##### 사용자 페이지 👤
  - 해당 사용자가 작성한 게시글과 댓글 목록을 작성일자 순으로 조회 가능
  - 해당 사용자의 가입날짜를 조회 가능


---
# ER Diagram

<img width="869" alt="POP ERD" src="https://user-images.githubusercontent.com/81337674/208286887-a145c447-52ba-4c50-88a1-2927f0177ee6.png">

---
# API 설계

📎 [POP API 명세서 ( Notion )](https://www.notion.so/POP-Proud-of-Pets-API-abc32bae15f944a3bd9a57c93ec6a11e#8a6f745645eb4eb2b62a0ee9fe25a646) 




# 🛠 Tools
<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> 
  
<br>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
 <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
   <img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">

  <br>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
     <img src="https://img.shields.io/badge/TypeORM-ccc?style=for-the-badge&&logoColor=white">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=white">
     <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
    


<br>



### Next.js + Typescript

<li>SSR방식을 사용함으로써 SEO(검색엔진최적화)에 유리</li>
<li>컴파일 단계에서 타입 관련 에러를 막을 수 있으며, 크로스 브라우징(브라우저 호환성) 문제 해결</li>

### Node.js + Express

<li>내장 HTTP 서버 라이브러리를 포함하고 있어 웹 서버에서 아파치 등의 별도의 소프트웨어 없이 동작하는 것이 가능</li>
<li> Javascript 언어로 Front-end 뿐만 아니라 Back-end 개발 환경을 구성할 수 있기에 생산성이 높고 러닝 커브가 줄어듦</li>
<li>일련의 강력한 기능을 제공하며 라우팅과 미들웨어 기반으로 간결하고 유연하게 웹서버를 구현할 수 있음</li>

### PostgreSQL & TypeORM
<li>복잡한 쿼리와 대규모 데이터베이스를 다룰 수 있는 기능이 풍부한 데이터베이스이며, 빠르고 유연한 개발이 가능
</li>
<li> Node.js 에서 작동하며 항상 최신 JS,TS 기능을 지원하고 다양한 데이터 베이스를 지원하며, 
코드에 entities와 함께 작업 가능</li>



###  ✏️ ESLint & Prettier

```
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};

```

### Django Convention
  
### Git Commit Convention

 
# 🔥 Issue & TroubleShooting

###  👉 Code Splitting
**Issue:** 
**trouble shooting**:
  
  
### 👉 SOP & CORS
**Issue:** 프론트엔드에서 테스팅하는 포트와 백엔드 서버의 포트가 달라서 Same Orgin Policy에 의해 리소스와 상호작용하는 것이 제한
  </br>
**trouble shooting**: 서버에 CORS 설정하여 프론트엔드의 도메인을 추가하여 프론트엔드에서의 데이터 요청이라도 서버 단에서 데이터 접근 권한을 허용.

### 👉 CSRF
**Issue:** Django는 기본적으로 csrf token을 사용하여 수정,삭제,등록 등의 행위에 대해 유효성 검증을 한다. 따라서 클라이언트 단에서의 게시글 수정,작성,삭제에 대한 유효성 검증을 하고 검증 오류시 403 Forbidden Response 반환한다.
  </br>
**trouble shooting**: 외부의 서버로 http통신할 때 axios를 사용하였고, axios로 call 보내고 response 받을 때 csrt token을 설정.

### 👉 새로고침 시 state값 날아가는 현상
**Issue:** 새로고침 시 reducer에 던달된 값들이 날아가버리고, 해당 컴포넌트에는 전달된 값들이 존재하지 않게 되고 컴포넌트 업데이트 시 값들이 존재하지 않는다는 에러가 발생.
</br>
**trouble shooting**: redux-persist를 사용하여 reducer 값들을 localStorage 또는 session에 저장하여 새로고침하여도 저장공간에 있는 데이터를 redux에 불러온다.


> 📎 상세내용 : [Issue & TroubleShooting](https://velog.io/@pjh1011409/%EC%9D%B4%EC%8A%88-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85)
  
# ⚒ Refectoring

### 👉 중복되는 useState, onChange

**Before:** form 태그에 글자를 작성하기 위한 onChange가 각각 필요하였고, 글자를 저장하기 위한 useState가 각각 필요하였다.
</br>
**After:** useState의 상태값에 객체로 값이 들어가게 하여 값들을 비구조화 할당으로 나눈다. onChange 또한 name과 value로 비구조화 할당하여 나누어준다.


### 👉 Barrel Structure & 절대경로

**Before:** 컴포넌트를 import해올 경우 상대경로로 각각 위치한 경로애서 가져와야 했고, 상대경로로 표시하여 ../ 지옥으로 작성되었다.
</br>
**After:** index.js를 각각의 폴더에 작성하여 depth를 얕게 만들어 컴포넌트들을 묶음으로 import해올 수 있고, jsconfig.json을 작성하여 절대경로를 사용하였다.

> 📎 상세내용 :[Code Refactoring](https://velog.io/@pjh1011409/Code-Refactoring)(velog)

