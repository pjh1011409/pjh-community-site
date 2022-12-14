import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import PostCard from '../../components/common/PostCard';
import CommentList from '../../components/userPage/CommentList';
import UserInfo from '../../components/userPage/UserInfo';
import { Comment, Post } from '../../types/types';

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
              <PostCard key={post.identifier} post={post} mutate={mutate} />
            );
          } else {
            const comment: Comment = data;
            return <CommentList key={comment.identifier} comment={comment} />;
          }
        })}
      </div>
      <UserInfo user={data.user} />
    </div>
  );
};

export default UserPage;
