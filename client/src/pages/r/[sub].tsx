import * as React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Post } from 'types/types';
import { SubBar, SubHeader, PostCard } from 'components';

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
          <div className="flex flex-wrap-reverse max-w-6xl px-4 pt-5 justify-center mx-auto">
            <div className="w-full md:mr-3 md:w-6/12">{renderPosts}</div>
            <SubBar sub={sub} mutate={mutate} />
          </div>
        </>
      )}
    </>
  );
};

export default SubPage;
