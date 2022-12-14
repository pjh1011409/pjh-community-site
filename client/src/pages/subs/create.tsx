import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { InputGroup } from 'components';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post('/subs', { name, title, description });
      router.push(`/r/${res.data.name}`);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data || {});
    }
  };

  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="w-10/12 p-4 mx-auto md:w-96 border-4 border-[#6d9acb]   bg-[#eaebed] rounded drop-shadow-2xl">
        <h1 className="mb-2 text-xl font-extrabold text-center text-[#1a1982]">
          커뮤니티 만들기
        </h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <p className="font-medium">Name</p>
            <p className="mb-2 text-xs text-gray-400">
              커뮤니티 이름은 변경할 수 없습니다.
            </p>
            <InputGroup
              placeholder="이름"
              value={name}
              setValue={setName}
              error={errors.name}
              type={'text'}
            />
          </div>
          <div className="my-6">
            <p className="font-medium">Title</p>
            <p className="mb-2 text-xs text-gray-400">
              주제를 나타냅니다. 언제든지 변경할 수 있습니다.
            </p>
            <InputGroup
              placeholder="제목"
              value={title}
              setValue={setTitle}
              error={errors.title}
              type={'text'}
            />
          </div>
          <div className="my-6">
            <p className="font-medium">Description</p>
            <p className="mb-2 text-xs text-gray-400">
              해당 커뮤니티에 대한 설명입니다.
            </p>
            <InputGroup
              placeholder="설명"
              value={description}
              setValue={setDescription}
              error={errors.description}
              type={'text'}
            />
          </div>
          <div className="flex justify-center">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-[#467fce]  hover:bg-[#3163a8] rounded">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('Missing auth token cookie');

    await Axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, {
      headers: { cookie },
    });
    return { props: {} };
  } catch (error) {
    res.writeHead(307, { Location: '/login' }).end();

    return { props: {} };
  }
};
