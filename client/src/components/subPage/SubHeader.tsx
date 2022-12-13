import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useAuthState } from '../../context/auth';
import { BackGround } from '../mainPage/Introduce';

const SubHeader = () => {
  const [ownSub, setOwnSub] = useState(false);
  const { authenticated, user } = useAuthState();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();
  const subName = router.query.sub;
  const { data: sub, mutate } = useSWR(subName ? `/subs/${subName}` : null);

  useEffect(() => {
    if (!sub || !user) return;
    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownSub) return;
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.name = type;
      fileInput.click();
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current!.name);

    try {
      await Axios.post(`/subs/${sub.name}/upload`, formData, {
        headers: { 'context-Type': 'multipart/form-data' },
      });
      mutate();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        hidden={true}
        ref={fileInputRef}
        onChange={uploadImage}
      />
      <div>
        {/* 배너 이미지 */}
        <div className="bg-[#e2e2e2]">
          {sub.bannerUrl ? (
            <>
              <div
                className="h-60 flex items-end justify-end"
                style={{
                  backgroundImage: `url(${sub.bannerUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '430px ',
                }}
                onClick={() => openFileInput('banner')}
              >
                {' '}
                <div className=" text-gray-800 text-xs mx-3 cursor-pointer">
                  Change Image
                </div>
              </div>
            </>
          ) : (
            <div
              className="h-20 bg-gray-400 flex items-end justify-center text-gray-500 text-xs cursor-pointer"
              onClick={() => openFileInput('banner')}
            >
              Change Image
            </div>
          )}
        </div>
        {/* 커뮤니티 메타 데이터 */}
        <BackGround>
          <div className="h-20 ">
            <div className="relative flex max-w-5xl px-5 mx-auto">
              <div className="absolute" style={{ top: -20 }}>
                {sub.imageUrl && (
                  <Image
                    src={sub.imageUrl}
                    alt="커뮤니티 이미지"
                    width={70}
                    height={70}
                    className="rounded-full"
                    onClick={() => openFileInput('image')}
                  />
                )}
              </div>
              <div className="pt-1 pl-24">
                <div className="flex items-center">
                  <h1 className="text-2xl font-extrabold text-[#394303]">
                    {sub.title}
                  </h1>
                </div>
                <p className="font-bold text-gray-600 text-small">
                  #{sub.name}
                </p>
              </div>
            </div>
          </div>
        </BackGround>
      </div>
    </div>
  );
};

export default SubHeader;
