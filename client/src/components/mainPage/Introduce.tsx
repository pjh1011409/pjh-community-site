import * as React from 'react';
import styled from 'styled-components';
import ImageSlider from './Slider';
import Image from 'next/image';

export const BackGround = styled.div`
  background-color: #dbb0a9;
  background-size: 3px 3px;
  background-image: linear-gradient(0deg, hsla(0, 0%, 0%, 0) 0, #fffaf2 3px);
  background-image: linear-gradient(90deg, hsla(0, 0%, 0%, 0) 0, #fffaf2 5px);
  color: black;
`;

const Introduce = () => {
  return (
    <BackGround>
      <div className="flex max-w-5xl px-4 pt-5  flex-wrap-reverse mx-auto ">
        <div className="w-10/12  md:w-5/12  my-4 mx-auto drop-shadow-2xl ">
          <ImageSlider />
        </div>
        <div className=" w-full md:w-6/12 my-4 mx-auto">
          <div className="flex text-xl text-center my-2 font-extrabold  justify-center items-end text-[#393737]">
            자신의 &nbsp;
            <div className="text-5xl text-[#b13e08] animate-bounce text-shadow-md">
              {' '}
              Pet{' '}
            </div>
            &nbsp;을 자랑하세요.
          </div>
          <div className="text-lg text-center my-2 font-extrabold flex items-end justify-center text-[#393737]">
            <div className="text-3xl text-[#103d7c] animate-bounce text-shadow-sm">
              Community
            </div>
            &nbsp; 를 생성해 소통하세요.
          </div>
          <div className="text-lg text-center my-2 font-extrabold flex items-end justify-center text-[#393737]">
            마음에 드는 게시글을 &nbsp;
            <div className="text-3xl text-[#05643b] animate-bounce text-shadow-sm">
              Like
            </div>
            &nbsp; !!
          </div>
          <br />
          <div className="flex justify-center items-center ">
            <Image
              src="/images/Github.png"
              alt="깃헙이미지"
              width="25"
              height="25"
            />
            <a href="https://github.com/pjh1011409/pjh-community-site">
              <div className="text-lg font-extrabold mx-2 hover:underline">
                Github
              </div>
            </a>
            <Image
              src="/images/Notion.png"
              alt="노션이미지"
              width="30"
              height="30"
            />{' '}
            <a href="https://www.notion.so/Hi-I-m-Park-Jeong-Ho-c95dc3cffa3343758aa4f4b115b99eeb">
              <div className="text-lg font-extrabold mx-2 hover:underline">
                Notion
              </div>
            </a>
          </div>
          <div className=" text-center font-bold mt-2 text-xs">
            Made by Park Jeong Ho @2022
          </div>
        </div>
      </div>
    </BackGround>
  );
};

export default Introduce;
