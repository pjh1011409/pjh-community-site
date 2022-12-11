import React from 'react';

const Shimmer = () => {
  return (
    <>
      <div className=" w-full md:w-11/12 placeholder:mb-4 bg-gray-400 rounded border-4 border-gray-300 drop-shadow-2xl px-10 py-3 opacity-60">
        <div className="border-2 bg-gray-300 w-2/3 rounded-md mb-3 h-8" />
        <div className="border-2 bg-gray-300 w-full rounded-md mb-3 h-8" />
        <div className="border-2 bg-gray-300 w-2/3 rounded-md mb-3 h-8" />
      </div>
    </>
  );
};

export default Shimmer;
