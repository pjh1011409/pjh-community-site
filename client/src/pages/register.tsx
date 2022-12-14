import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { useAuthState } from 'context/auth';
import { FaDog } from 'react-icons/fa';
import { InputGroup } from 'components';

const register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push('/');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await Axios.post('/auth/register', {
        email,
        password,
        username,
      });
      console.log('res:', res);
      router.push('/login');
    } catch (error: any) {
      console.log('error:', error);
      setErrors(error.response.data || {});
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-6 bg-pet-pattern">
        <div className="py-10  px-5 w-10/12 mx-auto md:w-8/12 lg:w-4/12 border-r-4 border-b-4 border border-[#3e7407] drop-shadow-2xl rounded-lg  bg-[#bec374]">
          <div className="items-center justify-center flex mb-2 text-2xl font-extrabold text-center text-[#3e7407] text-shadow-sm">
            <div className="mx-2">회원가입 </div>
            <FaDog />
          </div>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder={'Email'}
              value={email}
              setValue={setEmail}
              error={errors.email}
              type={'text'}
            />
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
              Sign Up
            </button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link href="/login" className="ml-1 text-blue-500 uppercase">
              로그인
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export default register;
