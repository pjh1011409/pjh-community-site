import { useState } from 'react';
import type { NextPage } from 'next';
import { Introduce, SideBar, Search, PostList } from 'components';

const Home: NextPage = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Introduce />
      <div className="flex max-w-7xl px-4 flex-wrap-reverse mx-auto">
        <PostList search={search} />
        <div className=" w-full md:w-3/12 my-4 mx-auto">
          <Search setSearch={setSearch} />
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Home;
