import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Comment, Post } from 'types/types';
import { PostCard, Comments, UserInfo } from 'components';

const UserPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const { data, mutate } = useSWR(username ? `/users/${username}` : null);

  if (!data) return null;

  return (
    <div className="flex flex-wrap-reverse mx-auto mt-10 items-end">
      {/* 유저 포스트 댓글 리스트 */}

      <div className="w-11/12  md:w-8/12 lg:w-5/12 mx-auto my-4 h-auto">
        {data.userData.map((data: any) => {
          if (data.type === 'Post') {
            const post: Post = data;
            return (
              <PostCard
                key={post.identifier}
                post={post}
                mutate={mutate}
                search={''}
              />
            );
          } else {
            const comment: Comment = data;
            return <Comments key={comment.identifier} comment={comment} />;
          }
        })}
      </div>
      <UserInfo user={data.user} />
    </div>
  );
};

export default UserPage;
