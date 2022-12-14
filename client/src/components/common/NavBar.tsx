import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useAuthDispatch, useAuthState } from 'context/auth';

export const NavBar: React.FC = () => {
  const { loading, authenticated, user } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    axios
      .post('/auth/logout')
      .then(() => {
        dispatch('LOGOUT');
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 bg-[#f6d9a3] h-13 py-2 rounded-b-lg border-b-4 border-[#e18a19]">
      <span className=" font-semibold  py-1 w-2/3 mx-auto">
        <Link href="/" className="flex items-end text-[#82384a] ">
          <Image src="/images/POP.png" alt="POP아이콘" width={45} height={45} />
          <p className="text-5xl ml-2 font-extrabold text-shadow-md">POP</p>
          <p className="text-xs font-semibold ">Proud Of Pets</p>
        </Link>
      </span>

      <div className="flex">
        {!loading &&
          (authenticated ? (
            <div className="flex flex-wrap  md:w-44 justify-end max: w-30 text-[#d07e12] font-semibold text-md">
              <div className=" md:w-30 my-2">
                <Link
                  href={`/u/${user?.username}`}
                  className="mx-1 hover:underline  px-2 mr-2 text-md text-center underline"
                >
                  {user?.username} 님
                </Link>
              </div>
              <button
                className="w-18 px-2 mr-2 text-md text-center "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex  text-[#d07e12] mx-1 font-extrabold text-lg"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="flex  text-[#d07e12] mx-1 font-extrabold text-lg"
              >
                회원가입
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
