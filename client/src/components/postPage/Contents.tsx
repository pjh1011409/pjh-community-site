import * as React from 'react';
import Axios from 'axios';
import Link from 'next/link';
import dayjs from 'dayjs';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { Post } from '../../types';
import Image from 'next/image';
import { useAuthState } from '../../context/auth';

interface ContentsProps {
  post: Post;
  subMutate?: () => void;
  vote: (value: number) => void;
}

const Contents = ({ post, vote }: ContentsProps) => {
  return (
    <div>
      <div className="my-1 text-4xl font-extrabold text-center text-[#14468c] text-shadow-sm">
        {post.title}
      </div>
      <div className="flex justify-center items-center">
        {/* 좋아요 싫어요 기능 부분 */}
        <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
          {/* 좋아요 */}
          <div
            className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-orange-500 mt-2"
            onClick={() => vote(1)}
          >
            {post.userVote === 1 ? (
              <BsHandThumbsUpFill className="text-orange-400 text-xl" />
            ) : (
              <BsHandThumbsUpFill className="text-xl" />
            )}
          </div>
          <p className="text-xs font-bold cursor-default">{post.voteScore}</p>
        </div>
        <span className="mx-1 text-sm text-gray-400">•</span>

        <div className="flex items-center  text-gray-800">
          <p className="text-sm mx-2">Posted by</p>
          <Link
            href={`/u/${post.username}`}
            className="mx-1 hover:underline text-lmd underline hover:text-blue-700 font-bold "
          >
            {post.username}
          </Link>
          <span className="mx-1 text-sm text-gray-400">•</span>

          <div className="mx-1 ">
            {dayjs(post.createdAt).add(9, 'hour').format('YYYY.MM.DD HH:mm')}
          </div>
        </div>
      </div>
      <div className="flex justify-start ml-5 md:ml-12  w-auto flex-wrap">
        <p className="my-3 text-xl font-bold"> 🗣 {post.body}</p>
      </div>

      <div className="flex justify-center">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="커뮤니티 이미지"
            width={100}
            height={100}
            className="w-8/12 lg:w-5/12"
          />
        )}
      </div>
    </div>
  );
};

export default Contents;
