import type { NextPage } from 'next';
import Introduce from '../components/Introduce';
import SubBar from '../components/SubBar';
import Search from '../components/Search';
import PostList from '../components/PostList';

const Home: NextPage = () => {
  return (
    <>
      <Introduce />
      <div className="flex max-w-7xl px-4 flex-wrap-reverse mx-auto">
        {/* 포스트 리스트 */}
        <PostList />
        {/* 사이드바 */}
        <div className=" w-full md:w-3/12 my-4 mx-auto">
          <Search />
          <SubBar />
        </div>
      </div>
    </>
  );
};

export default Home;
