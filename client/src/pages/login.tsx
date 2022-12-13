import * as React from 'react';
import { useState, FormEvent } from 'react';
import InputGroup from '../components/common/InputGroup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthDispatch } from '../context/auth';
import { useAuthState } from '../context/auth';
import { FaCat } from 'react-icons/fa';

const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  const dispatch = useAuthDispatch();
  const router = useRouter();

  if (authenticated) router.push('/');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        '/auth/login',
        { password, username },
        { withCredentials: true }
      );
      dispatch('LOGIN', res.data?.user);

      router.push('/');
    } catch (error: any) {
      console.log('error:', error);
      setErrors(error.response?.data || {});
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-6 bg-pet-pattern">
        <div className="py-10  px-5 w-10/12 mx-auto md:w-8/12 lg:w-4/12 border-r-4 border-b-4 border border-[#3e7407] drop-shadow-2xl rounded-lg  bg-[#bec374]">
          <div className="items-center justify-center flex mb-2 text-2xl font-extrabold text-center text-[#3e7407] text-shadow-sm">
            <div className="mx-2">로그인 </div>
            <FaCat />
          </div>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder={'Username'}
              value={username}
              setValue={setUsername}
              error={errors.username}
              type={'text'}
            />
            <InputGroup
              placeholder={'Password'}
              value={password}
              setValue={setPassword}
              error={errors.password}
              type={'password'}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-[#c7781e]  rounded hover:bg-[#e0a476] hover:text-[#786d09]">
              Login
            </button>
          </form>
          <small>
            아직 계정이 없으신가요?
            <Link href="/register" className="ml-1 text-blue-500 uppercase">
              회원가입
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default login;
