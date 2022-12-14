import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { useAuthState } from '../../context/auth';
import { Sub } from '../../types/types';
import dayjs from 'dayjs';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';

type Props = {
  sub: Sub;
  mutate?: () => void;
};

const SideBar = ({ sub, mutate }: Props) => {
  const { authenticated, user } = useAuthState();
  const [updateName, setUpdateName] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');

  const router = useRouter();

  const deleteSub = async (name: string | undefined) => {
    try {
      await Axios.delete(`/subs/${name}`);
      if (mutate) mutate();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const updateSub = async (e: FormEvent) => {
    e.preventDefault();
    if (updateTitle.trim() === '') {
      return;
    }

    try {
      await Axios.put(`/subs/${updateName}`, {
        body: updateTitle,
      });
      if (mutate) mutate();
      setUpdateTitle('');
      setUpdateName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-2 md:w-4/12 mb-3 max-3/12 ">
      <div className=" border-r-4 border-b-4 border border-[#6f86d1] bg-[#eaebed] rounded-2xl drop-shadow-2xl">
        <div className="p-3 bg-[#6f86d1] rounded-t-xl">
          <p className="font-bold text-white text-center text-lg">
            About Community
          </p>
        </div>
        <div className="my-3 ">
          <div className="font-bold text-center">
            {authenticated && user?.username === sub.username ? (
              <>
                {updateName === sub.name ? (
                  <>
                    <form
                      onSubmit={updateSub}
                      className="flex justify-center items-center"
                    >
                      <textarea
                        className="text-center my-3 h-[30px] border border-gray-300 rounded  focus:border-gray-600"
                        onChange={e => setUpdateTitle(e.target.value)}
                        value={updateTitle}
                      />
                      <div className="hover:text-[#3163a8]">
                        <button
                          className="text-xl  text-gray-500 mx-2"
                          disabled={updateTitle.trim() === ''}
                        >
                          <BsPencilSquare />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex hover:text-[#3163a8] justify-center">
                    <p className="my-3 text-2xl text-[#df883f] mr-2">
                      {sub?.title}
                    </p>
                    <button
                      className="text-md  text-gray-500"
                      onClick={() => {
                        setUpdateTitle(sub.title);
                        setUpdateName(sub.name);
                      }}
                    >
                      <BsPencilSquare />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="my-3 text-2xl text-[#df883f] mr-2">{sub?.title}</p>
            )}
            <p className="my-3 text-sm">{sub?.description}</p>
            <p className="my-3">{sub.posts.length} Posts</p>
            <p className=" tracking-wider my-3">
              {dayjs(sub?.createdAt).format('MM.DD.YYYY')}
            </p>
          </div>
          {authenticated && (
            <div className=" w-full mt-10 flex justify-center items-start ">
              <Link
                href={`/r/${sub.name}/create`}
                className=" py-2 px-3  mx-3 text-sm text-white bg-[#467fce] rounded hover:bg-[#3163a8] "
              >
                게시글 생성
              </Link>
              {authenticated && user?.username === sub.username ? (
                <div className="text-3xl text-[#467fce] hover:text-[#3163a8] mt-1 ">
                  <button
                    onClick={() => {
                      deleteSub(sub.name);
                    }}
                  >
                    <BsTrashFill />
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
