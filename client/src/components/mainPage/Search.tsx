import * as React from 'react';
import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  setSearch: Dispatch<SetStateAction<string>>;
}

const Search = ({ setSearch }: SearchProps) => {
  const searchPost = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <div className=" w-full  mx-auto mb-3 ">
        <div className="h-10 relative flex items-center  border-r-4 border-b-4 border border-[#034184] rounded hover:bg-white drop-shadow-lg bg-[#e0eaff]">
          <FaSearch className="ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 bg-transparent rounded h-7 focus:outline-none"
            onChange={searchPost}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
