import axios from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsHandThumbsUpFill, BsTrashFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { useAuthState } from '../../context/auth';
import { Post } from '../../types';
import Axios from 'axios';

interface PostCardProps {
  post: Post;
  subMutate?: () => void;
  mutate?: () => void;
}

const PostCard = ({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  mutate,
  subMutate,
}: PostCardProps) => {
  const router = useRouter();
  const isInSubPage = router.pathname === '/r/[sub]';

  const { authenticated, user } = useAuthState();

  const vote = async (value: number) => {
    if (!authenticated) router.push('/login');

    if (value === userVote) value = 0;

    try {
      await axios.post('/votes', { identifier, slug, value });
      if (mutate) mutate();
      if (subMutate) subMutate();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (identifier: string | undefined) => {
    try {
      await Axios.delete(`/posts/${identifier}/${slug}`);
      if (mutate) mutate();
      if (subMutate) subMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex mb-4 bg-[#ebf3f9] rounded border-r-4 border-b-4 border border-[#91bfe2] drop-shadow-2xl h-auto"
      id={identifier}
    >
      {/* 좋아요 싫어요 기능 부분 */}
      <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
        {/* 좋아요 */}
        <div
          className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-orange-500 mt-2"
          onClick={() => vote(1)}
        >
          {userVote === 1 ? (
            <BsHandThumbsUpFill className="text-orange-400 text-xl" />
          ) : (
            <BsHandThumbsUpFill className="text-xl" />
          )}
        </div>
        <p className="text-xs font-bold">{voteScore}</p>
      </div>
      {/* 포스트 데이터 부분 */}
      <div className="w-full p-2 ">
        <div className="flex items-center my-2">
          {!isInSubPage && (
            <div className="flex items-center">
              <Link href={`/r/${subName}`}>
                <Image
                  src={sub!.imageUrl}
                  alt="sub"
                  className="rounded-full cursor-pointer"
                  width={20}
                  height={25}
                />
              </Link>
              <Link
                href={`/r/${subName}`}
                className="ml-2 mx-1 text-sm font-bold cursor-pointer  text-gray-500 underline hover:text-gray-900"
              >
                #{sub?.title}
              </Link>
              <span className="mx-1  text-sm text-gray-400">•</span>
            </div>
          )}

          <p className="text-xs md:text-sm text-gray-500">
            Posted by
            <Link
              href={`/u/${username}`}
              className="mx-1  cursor-pointer underline  hover:text-gray-900"
            >
              {username} 님
            </Link>
          </p>
          <span className="mx-1 text-sm text-gray-400">•</span>
          <Link
            href={url}
            className="mx-1 underline text-sm text-gray-500  hover:text-gray-900"
          >
            {dayjs(createdAt).add(9, 'hour').format('YYYY-MM-DD HH:mm')}
          </Link>
          <div className="flex ml-auto">
            {authenticated && user?.username === username ? (
              <button
                onClick={() => {
                  deletePost(identifier);
                }}
                className="mx-2"
              >
                <BsTrashFill className="text-lg hover:text-gray-900 text-gray-500 mt-1 " />
              </button>
            ) : null}
          </div>
        </div>

        <Link href={url} className=" text-3xl font-extrabold text-[#14468c]">
          {title}
        </Link>
        <div className="h-5 my-3">
          {body && <p className="text-lg">{body}</p>}
        </div>

        <div>
          <Link href={url} className="flex items-center">
            <RiMessage2Fill />
            <span className="mx-2 font-bold text-xl text-[#122b19]">
              Comment: {commentCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
