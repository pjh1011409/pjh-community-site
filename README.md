## 🐶 POP(Prod of pets) 🐱

<p align="center"> 
💡 Intro &nbsp; <strong>|</strong> &nbsp;
🗓 프로젝트 기간&nbsp; <strong>|</strong> &nbsp;
📎 Link &nbsp; <strong>|</strong> &nbsp;
🍀 나의 개발일지 &nbsp; <strong>|</strong> &nbsp; 
⚙️ 주요 기능 &nbsp; <strong>|</strong> &nbsp; 
💻 Service Architecture
</p>
<p align="center"> 
📄 Project Architecture &nbsp; <strong>|</strong> &nbsp;
🗾 ER Diagram  &nbsp; <strong>|</strong> &nbsp;
📡 API 설계 &nbsp; <strong>|</strong> &nbsp;
🛠 Tools &nbsp; <strong>|</strong> &nbsp;
👍 사용 이유 
<p align="center"> 
🔥 Issue & TroubleShooting &nbsp; <strong>|</strong> &nbsp;
🎥 GIF
<br></p>

---

<br>

##💡 Intro

<strong>애완동물을 자랑스럽게!</strong>
<br>
<strong>자신의 펫을 마음껏 자랑하고, 펫지식을 공유하는 커뮤니티 사이트입니다.</strong>

<br>

## 🗓 프로젝트 기간

2022.11.18 ~ 2022.12.18
  <br>
## 📎 Link

**Notion**
👉 [Notion Portfolio](https://www.notion.so/POP-Proud-of-Pets-2df286b031e74e20b089270d9d802f4e)
<br>

## 🍀 나의 개발일지

<details>
<summary>✏️ 프로젝트를 개발하며 작성한 개발블로그입니다.</summary>

- [Start & Setting](https://velog.io/@pjh1011409/%E3%85%88-6jniie0o)  
- [Entity 생성하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Entity) 
- [회원가입하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Auth)
- [로그인하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Login)
- [Context 재사용하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Context)
- [커뮤니티, 미들웨어 생성하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Community)
- [커뮤니티 리스트, nav바, 로그아웃 생성하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Community2)
- [상세피이지, 이미지 업로드, 사이드바 생성하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Community3)
- [게시글 생성, 조회하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Post-Create)
- [댓글달기, 투표하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Comment-Vote)
- [무한스크롤 구현하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Infinite-Scroll)
- [사용자 페이지 생성하기](https://velog.io/@pjh1011409/PJHs-Community-Site-User)
- [수정, 삭제 기능 추가하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Delete-Update)
- [이미지 업로드, 검색하기](https://velog.io/@pjh1011409/PJHs-Community-Site-Image-Search)

</details>
 
  
<br>

## ⚙️ 주요 기능 

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

  <br>



<br>

## 💻 Service Architecture

<img width="800" alt="POP Structure" src="https://user-images.githubusercontent.com/81337674/211320163-94f6488d-1d58-468c-b94a-d5a29e9a948a.png">


<br>

## 📄 Project Architecture


<details>
<summary> <strong>Client </strong> </summary>
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
</details>



<details>
<summary> <strong>Server </strong> </summary>
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
</details>



<br>


## 🗾 ER Diagram

<img width="869" alt="POP ERD" src="https://user-images.githubusercontent.com/81337674/208286887-a145c447-52ba-4c50-88a1-2927f0177ee6.png">

<br>

## 📡 API 설계

#### 📎 [POP API 명세서 ( Notion )](https://www.notion.so/POP-Proud-of-Pets-API-abc32bae15f944a3bd9a57c93ec6a11e#8a6f745645eb4eb2b62a0ee9fe25a646) 



<br>

## 🛠 Tools
<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> 
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
  
<br>

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

## 👍 사용 이유

### Next.js + Typescript

- SSR방식을 사용함으로써 SEO(검색엔진최적화)에 유리
- 컴파일 단계에서 타입 관련 에러를 막을 수 있으며, 크로스 브라우징(브라우저 호환성) 문제 해결

### Node.js + Express

- 내장 HTTP 서버 라이브러리를 포함하고 있어 웹 서버에서 아파치 등의 별도의 소프트웨어 없이 동작하는 것이 가능
- Javascript 언어로 Front-end 뿐만 아니라 Back-end 개발 환경을 구성할 수 있기에 생산성이 높고 러닝 커브가 줄어듦
- 일련의 강력한 기능을 제공하며 라우팅과 미들웨어 기반으로 간결하고 유연하게 웹서버를 구현할 수 있음

### PostgreSQL & TypeORM
- 복잡한 쿼리와 대규모 데이터베이스를 다룰 수 있는 기능이 풍부한 데이터베이스이며, 빠르고 유연한 개발이 가능
- Node.js 에서 작동하며 항상 최신 JS,TS 기능을 지원하고 다양한 데이터 베이스를 지원하며, 
코드에 entities와 함께 작업 가능</li>


### Axios & useSWR
- response timeout 처리가 가능하며, Promise 기반으로 만들어져 데이터를 다루기 편리함
- 여러 컴포넌트들에 모두 동일한 원격의 상태를 공유하며, 캐시된 데이터를 이용하여 효율적인 동작을 만들어냄. 데이터를 가져오는데 특화.

<br>


# 🔥 Issue & TroubleShooting

####  👉 재사용성 높이기
- **Issue**  
  - 회원정보는 어느 컴포넌트에서나 자주 쓰이는 데이터. 따라서, 상위 컴포넌트에서 최하위컴포넌트까지 props로 정보를 전달하는 경우 발생
- **trouble shooting**
  - **Context**에 담아 재사용성을 높이고, **Reducer**를 통하여 관리하고 dispatch를 통해 데이터를 업데이트.
---
####  👉 Foreign key constraint
- **Issue**
  -  커뮤니티, 게시글, 댓글을 삭제하는 과정에서 외래키 참조에 대한 에러 발생.
- **trouble shooting** 
  - 테이블마다 외래키를 통해 연관관계를 맺고 있기 때문이다. 따라서, **CASCADE문**을 사용하여 삭제시 참조되는 테이블에서도 업데이트가 이루어지게 한다.

```
// Example
@ManyToOne(() => Post, post => post.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
```
---
####  👉 미들웨어 생성하기
- **Issue** 
  - route 생성시 대부분의 기능들이 사용자 인증에 대한 핸들러를 사용
- **trouble shooting**
   - 중복적으로 사용되는 핸들러를 재사용하기 위하여 **미들웨어**로 분리
  - User Middleware : 여러 핸들러에서 유저 정보를 제공
  - Auth Middleware : 유저 정보 또는 유저 등급에 따른 인증 제공

---
####  👉 Infinite Scroll
- **Issue** 
  - 수많은 게시글에 대한 데이터 출력
- **trouble shooting**
   - **useSWRInfinite**을 통해서 페이지를 스크롤하는 동작에 반응하여 자동으로 필요한 데이터를 불러오는 기능을 구현
   - 페이지의 끝이라는 특정지점에 도달하는지 관찰하기 위해 **Intersection Observer API**을 사용

<br>

 
<br>




## 🎥 GIF
**메인페이지(무한스크롤)**|**회원가입 & 로그인**
:--------:|:--------:|
![메인페잊](https://user-images.githubusercontent.com/81337674/208297127-35ba136d-c09b-4aeb-8390-d43418bda54b.gif)|![회원가입,로그인](https://user-images.githubusercontent.com/81337674/208295695-59842dd7-bb7b-4c56-944b-189cfbfb3e48.gif)
**커뮤니티**|**게시글**
![커뮤니티](https://user-images.githubusercontent.com/81337674/208297879-fd1d7add-cc87-4d6a-8357-ae12dc3c64a3.gif)|![게시글](https://user-images.githubusercontent.com/81337674/208297597-aad3822d-dc7f-49be-a050-87f6f7b3b8fb.gif)
**댓글**|**좋아요**
![댓글](https://user-images.githubusercontent.com/81337674/208297434-b14d36f8-10ff-4b91-a97e-1159d2c62e89.gif)|![좋아요](https://user-images.githubusercontent.com/81337674/208297700-f7db3b27-a7e0-4425-b016-e0a80ce792d4.gif)
**사용자페이지**|**검색하기**
![사용자페이지](https://user-images.githubusercontent.com/81337674/208297917-af174774-15a4-436f-85cc-02897327dc63.gif)|![검색](https://user-images.githubusercontent.com/81337674/208298068-86bc997c-1c74-462a-8234-3ceb61a858a6.gif)

<br>

 
<br>

## ✚ 추가해볼 기능

1️⃣  검색기능을 frontend에서의 filter, includes 을 통한 데이터 처리가 아닌, backend에서 입력한 값에 대한 데이터를 불러오는 방식으로 변환

2️⃣ 텍스트 에디터를 추가하여 편리하고 유용한 게시글 작성 

3️⃣ 카카오 로그인 API을 사용하여 간편로그인 구현

