import Axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';

interface CreateImageProps {
  postId: string;
  postSlug: string;
}

const CreateImage = ({ postId, postSlug }: CreateImageProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { sub: subName } = router.query;

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    openFileInput('image');
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current!.name);

    try {
      await Axios.post(`/posts/${postId}/upload`, formData, {
        headers: { 'context-Type': 'multipart/form-data' },
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const openFileInput = (type: string) => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.name = type;
      fileInput.click();
    }
  };

  const gotoPost = () => {
    router.push(`/r/${subName}/${postId}/${postSlug}`);
  };
  return (
    <>
      <div className="flex items-end r mt-10 ">
        <input type="file" ref={fileInputRef} onChange={uploadImage} />
        <button
          onClick={gotoPost}
          className="w-24 mt-5 px-5 py-2 text-sm font-semibold text-white bg-[#467fce]  hover:bg-[#3163a8] rounded"
        >
          작성완료
        </button>
      </div>
    </>
  );
};

export default CreateImage;
