import React from 'react';
import Axios from 'axios';
import Link from 'next/link';

import { useAuthState } from '../../context/auth';
import { FormEvent, useState } from 'react';

import { RiMessage2Fill } from 'react-icons/ri';
import { Post } from '../../types';

interface CreateCommentProps {
  post: Post;
  commentMutate: () => void;
}

const CreateComment = ({ post, commentMutate }: CreateCommentProps) => {
  const { authenticated, user } = useAuthState();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      return;
    }

    try {
      await Axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, {
        body: newComment,
      });
      commentMutate();
      setNewComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* 댓글 작성 구간 */}
      <div className="ml-5 mt-10 md:ml-12 ">
        <div className="flex items-center text-xl text-[#122b19]">
          <RiMessage2Fill />
          <span className="font-bold mx-2">{post.commentCount} Comments</span>
        </div>
        <div className=" mb-4 mt-5 ">
          {authenticated ? (
            <>
              <p className="mb-1 text-xs">
                <Link
                  href={`/u/${user?.username}`}
                  className="font-semibold text-[#cf4a84]"
                >
                  {user?.username}
                </Link>{' '}
                으로 댓글 작성
              </p>
              <form onSubmit={handleSubmit} className="flex items-center">
                <textarea
                  className="w-9/12  h-auto p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600 md:w-1/2 overflow-hidden"
                  onChange={e => setNewComment(e.target.value)}
                  value={newComment}
                />
                <div>
                  <button
                    className="px-3 py-2 rounded mx-3 bg-sky-600 hover:bg-sky-700 text-white "
                    disabled={newComment.trim() === ''}
                  >
                    작성
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-between px-2 py-4 border border-gray-200 rounded">
              <p className="font-semibold text-gray-400">
                댓글 작성을 위해서 로그인 해주세요.
              </p>
              <div>
                <Link
                  href={`/login`}
                  className="px-3 py-1 text-white bg-gray-400 rounded"
                >
                  로그인
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
