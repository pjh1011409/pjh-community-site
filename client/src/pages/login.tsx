import * as React from 'react';
import { useState, FormEvent } from 'react';
import InputGroup from '../components/InputGroup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthDispatch } from '../context/auth';
import { useAuthState } from '../context/auth';

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
      dispatch('LOGIN', res.data.user);

      router.push('/');
    } catch (error: any) {
      console.log('error:', error);
      setErrors(error.response?.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder={'Username'}
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder={'Password'}
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
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
    </div>
  );
};

export default login;