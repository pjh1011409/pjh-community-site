import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { Sub } from '../../types/types';
import { useAuthState } from '../../context/auth';
import Axios from 'axios';
import { ImNewspaper } from 'react-icons/im';

const SubBar = () => {
  const { authenticated } = useAuthState();
  const fetcher = async (url: string) => {
    return await Axios.get(url).then(res => res.data);
  };
  const address = `/subs/sub/topSubs`;

  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);

  return (
    <>
      <div className=" border-r-4 border-b-4 border border-[#6d9acb]   bg-[#eaebed] rounded drop-shadow-2xl">
        <div className="p-4 ">
          <p className="text-lg font-extrabold text-center text-[#1a1982]">
            Top Community
          </p>
        </div>
        <div>
          {topSubs?.map(sub => (
            <div
              key={sub.name}
              className="flex items-center px-4 py-2 text-xs border-b border-[#6d9acb]"
            >
              <Link href={`/r/${sub.name}`}>
                <Image
                  src={sub.imageUrl}
                  className="rounded-full cursor-pointer"
                  alt="Sub"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href={`/r/${sub.name}`}
                className="ml-2 font-bold hover:cursor-pointer"
              >
                {sub.title}
              </Link>
              <div className="flex ml-auto text-lg font-bold items-center">
                <ImNewspaper />
                <p className="mx-1">{sub.postCount}</p>
              </div>
            </div>
          ))}
        </div>
        {authenticated && (
          <div className="w-full py-6 text-center">
            <Link
              href="/subs/create"
              className="w-full p-2 text-center text-white bg-[#467fce] rounded hover:bg-[#3163a8]"
            >
              커뮤니티 만들기
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SubBar;
