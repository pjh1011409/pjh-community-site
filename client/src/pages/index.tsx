import type { NextPage } from 'next';
import Introduce from '../components/mainPage/Introduce';
import SubBar from '../components/mainPage/SideBar';
import Search from '../components/mainPage/Search';
import PostList from '../components/mainPage/PostList';
import { useState } from 'react';

const Home: NextPage = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Introduce />
      <div className="flex max-w-7xl px-4 flex-wrap-reverse mx-auto">
        {/* 포스트 리스트 */}
        <PostList search={search} />
        {/* 사이드바 */}
        <div className=" w-full md:w-3/12 my-4 mx-auto">
          <Search setSearch={setSearch} />
          <SubBar />
        </div>
      </div>
    </>
  );
};

export default Home;
