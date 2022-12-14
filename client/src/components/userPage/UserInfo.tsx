import dayjs from 'dayjs';
import React from 'react';
import { User } from '../../types/types';

interface DataProps {
  user: User;
}

const UserInfo = ({ user }: DataProps) => {
  return (
    <>
      <div className="w-11/12 md:w-3/12 my-4 mx-auto border-r-4 border-b-4 border border-[#6f86d1] bg-[#eaebed] rounded-xl drop-shadow-2xl">
        <div className="flex items-center justify-center p-3 bg-[#6f86d1] text-white rounded-t-lg">
          <p className="pl-2 text-2xl font-bold ">{user.username}</p>
        </div>
        <p className="text-center text-orange-600 font-bold p-3">
          {dayjs(user.createdAt).format('YYYY.MM.DD')}
          가입
        </p>
      </div>
    </>
  );
};

export default UserInfo;
