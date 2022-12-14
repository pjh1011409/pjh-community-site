import * as React from 'react';
import { Comment } from '../../types/types';
import Link from 'next/link';
import { RiMessage2Fill } from 'react-icons/ri';

interface CommentProps {
  comment: Comment;
}

const CommentList = ({ comment }: CommentProps) => {
  return (
    <>
      <div className="flex my-4 bg-[#f0f6e9] rounded border border-r-4 border-b-4 border-[#688b40] drop-shadow-2xl h-auto">
        <div className="text-2xl flex w-10 py-10bg-white border-r rounded-l justify-center items-center">
          <RiMessage2Fill />
        </div>
        <div className="w-full p-2">
          <p className="mb-2 text-sm text-gray-500">
            <span className="cursor-pointer hover:underline">
              {comment.username}님의
            </span>
            <span> commented on</span>
            <Link
              href={`/u/${comment.post?.url}`}
              className="font-semibold cursor-pointer underline mx-1 hover:text-gray-900"
            >
              {comment.post?.title}
            </Link>
          </p>
          <hr />
          <p className="p-1">: {comment.body}</p>
        </div>
      </div>
    </>
  );
};

export default CommentList;
