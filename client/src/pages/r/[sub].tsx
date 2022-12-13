import * as React from 'react';
import { useRouter } from 'next/router';
import SideBar from '../../components/subPage/SubBar';
import useSWR from 'swr';
import PostCard from '../../components/common/PostCard';
import { Post } from '../../types';
import SubHeader from '../../components/subPage/SubHeader';

const SubPage = () => {
  const router = useRouter();
  const subName = router.query.sub;
  const { data: sub, mutate } = useSWR(subName ? `/subs/${subName}` : null);

  let renderPosts;
  if (!sub) {
    renderPosts = <p className="text-lg text-center">로딩중...</p>;
  } else if (sub.posts.length === 0) {
    renderPosts = (
      <p className="text-lg text-center">아직 작성된 포스트가 없습니다.</p>
    );
  } else {
    renderPosts = sub.posts.map((post: Post) => (
      <PostCard key={post.identifier} post={post} subMutate={mutate} />
    ));
  }

  return (
    <>
      {sub && (
        <>
          <SubHeader />
          {/* 포스트와 사이드바 */}
          <div className="flex flex-wrap-reverse max-w-6xl px-4 pt-5 justify-center mx-auto">
            <div className="w-full md:mr-3 md:w-6/12">{renderPosts}</div>
            <SideBar sub={sub} mutate={mutate} />
          </div>
        </>
      )}
    </>
  );
};

export default SubPage;
