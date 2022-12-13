import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { FormEvent, useState, Dispatch, SetStateAction } from 'react';
import { Post } from '../../types';
import cls from 'classnames';

interface CreateFormProps {
  setDone: Dispatch<SetStateAction<boolean>>;
  setPostId: Dispatch<SetStateAction<string>>;
  setPostSlug: Dispatch<SetStateAction<string>>;
}

const CreateForm = ({ setDone, setPostId, setPostSlug }: CreateFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();
  const { sub: subName } = router.query;

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data: post } = await Axios.post<Post>('/posts', {
        title: title.trim(),
        body,
        sub: subName,
      });
      if (!post.title) return;
      setDone(false);
      setPostId(post.identifier);
      setPostSlug(post.slug);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data || {});
    }
  };
  return (
    <>
      <form onSubmit={submitPost}>
        <div className="relative mb-2">
          <input
            type="text"
            className={cls(
              `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500`,
              { 'border-red-500': errors.title }
            )}
            placeholder="제목"
            maxLength={20}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="h-4 text-xs text-red-500 py-2">{errors.title}</div>

          <div
            style={{ top: 10, right: 10 }}
            className="absolute mb-2 text-sm text-gray-400 select-none"
          >
            {title.trim().length}/20
          </div>
        </div>
        <textarea
          rows={4}
          placeholder="설명"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <div className="flex justify-center">
          <button className="mt-5 px-4 py-2 text-sm font-semibold text-white bg-[#467fce]  hover:bg-[#3163a8] rounded">
            생성하기
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateForm;
