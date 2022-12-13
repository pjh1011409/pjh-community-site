import Axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import CreateForm from '../../../components/postPage/CreateForm';
import CreateImage from '../../../components/postPage/CreateImage';

const PostCreate = () => {
  const [done, setDone] = useState(true);
  const [postId, setPostId] = useState('');
  const [postSlug, setPostSlug] = useState('');

  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="p-8 w-10/12 mx-auto md:w-7/12 lg:w-4/12 border-4 border-[#6d9acb]   bg-[#eaebed] rounded drop-shadow-2xl">
        <h1 className="mb-3 text-xl font-extrabold text-center text-[#1a1982]">
          게시글 생성하기
        </h1>
        {done ? (
          <CreateForm
            setDone={setDone}
            setPostId={setPostId}
            setPostSlug={setPostSlug}
          />
        ) : (
          <CreateImage postId={postId} postSlug={postSlug} />
        )}
      </div>
    </div>
  );
};

export default PostCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('쿠키가 없습니다.');

    await Axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
      headers: { cookie },
    });
    return { props: {} };
  } catch (error) {
    res.writeHead(307, { Location: '/login' }).end();

    return { props: {} };
  }
};
