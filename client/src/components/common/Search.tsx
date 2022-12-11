import * as React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <>
      <div className=" w-full  mx-auto mb-3 ">
        <div className="h-10 relative flex items-center  border-4 border-[#034184] rounded hover:bg-white drop-shadow-lg bg-[#e0eaff]">
          <FaSearch className="ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 bg-transparent rounded h-7 focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Search;
