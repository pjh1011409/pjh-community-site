import React from 'react';

const Shimmer = () => {
  return (
    <>
      <div className=" w-full md:w-11/12 placeholder:mb-4 bg-gray-400 rounded border-4 border-gray-300 drop-shadow-2xl px-10 py-10 opacity-60">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shimmer;
