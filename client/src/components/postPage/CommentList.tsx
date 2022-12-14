import Axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useAuthState } from '../../context/auth';
import { FormEvent, useState } from 'react';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { Comment } from '../../types/types';

interface CommentListProps {
  comments: Comment[] | undefined;
  commentMutate: () => void;
  vote: (value: number, comment: Comment) => void;
}

const CommentList = ({ comments, commentMutate, vote }: CommentListProps) => {
  const { authenticated, user } = useAuthState();
  const router = useRouter();
  const { slug } = router.query;
  const [updateId, setUpdateId] = useState('');
  const [update, setUpdate] = useState('');

  const deleteComment = async (identifier: string | undefined) => {
    try {
      await Axios.delete(`/posts/${identifier}/${slug}/comments`);
      commentMutate();
    } catch (error) {
      console.log(error);
    }
  };

  const updateComment = async (e: FormEvent) => {
    e.preventDefault();
    if (update.trim() === '') {
      return;
    }

    try {
      await Axios.put(`/posts/${updateId}/${slug}/comments`, {
        body: update,
      });
      commentMutate();
      setUpdate('');
      setUpdateId('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="ml-5 md:ml-12  my-4 w-10/12">
        {comments?.map(comment => (
          <div
            className="flex border-b-2 border-[#b3d0e7]"
            key={comment.identifier}
          >
            <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
              <div
                className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-orange-500 "
                onClick={() => vote(1, comment)}
              >
                {comment.userVote === 1 ? (
                  <BsHandThumbsUpFill className="text-orange-400 text-md" />
                ) : (
                  <BsHandThumbsUpFill className="text-md" />
                )}
              </div>
              <p className="text-xs font-bold">{comment.voteScore}</p>
            </div>

            <div className="py-2 pr-3">
              <div className="mb-1 text-md leading-none">
                <Link
                  href={`/u/${comment.username}`}
                  className="mr-1 font-bold hover:underline text-[#cf4a84]"
                >
                  {comment.username}
                </Link>

                <span className="mx-1 text-sm text-gray-400">•</span>

                <span className="text-gray-600">
                  {`${dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}`}
                </span>
                <span className="mx-1 text-sm text-gray-400">•</span>
                {authenticated &&
                user?.username === comment.username &&
                !updateId ? (
                  <>
                    <button
                      className="mr-1"
                      onClick={() => {
                        deleteComment(comment.identifier);
                      }}
                    >
                      <BsTrashFill />
                    </button>
                    <button
                      onClick={() => {
                        setUpdateId(comment.identifier);
                        setUpdate(comment.body);
                      }}
                    >
                      <BsPencilSquare />
                    </button>
                  </>
                ) : null}
              </div>
              {updateId === comment.identifier ? (
                <>
                  <form onSubmit={updateComment} className="flex items-center">
                    <textarea
                      className=" h-auto  p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600 overflow-hidden"
                      onChange={e => setUpdate(e.target.value)}
                      value={update}
                    />
                    <div className="flex">
                      <button
                        className="px-3 py-2 rounded mx-3 bg-sky-600 hover:bg-sky-700 text-white "
                        disabled={update.trim() === ''}
                      >
                        수정
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <p className="py-3 text-blue-900 font-bold text-lg">
                  {comment.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
