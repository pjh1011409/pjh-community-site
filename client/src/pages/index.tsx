import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';
import axios from 'axios';
import { Sub, Post } from '../types';
import useSWR from 'swr';
import { useAuthState } from '../context/auth';
import useSWRInfinite from 'swr/infinite';
import PostCard from '../components/postCard';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { authenticated } = useAuthState();
  const fetcher = async (url: string) => {
    return await axios.get(url).then(res => res.data);
  };
  const address = `/subs/sub/topSubs`;

  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?page=${pageIndex}`;
  };

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    mutate,
  } = useSWRInfinite<Post[]>(getKey);

  const isInitialLoading = !data && !error;
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];

  const [observedPost, setObserverPost] = useState('');

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObserverPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting === true) {
          console.log('Reached bottom of post');
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );

    observer.observe(element);
  };

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/* 포스트 리스트 */}
      <div className="w-full md:mr-3 md:w-8/12">
        {isInitialLoading && <p className="text-lg text-center">Loading...</p>}
        {posts?.map(post => (
          <PostCard post={post} key={post.identifier} mutate={mutate} />
        ))}
        {isValidating && posts.length > 0 && (
          <p className="text-lg text-center">Loading More...</p>
        )}
      </div>

      {/* 사이드바 */}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="bg-white border rounded">
          <div className="p-4 border-b">
            <p className="text-lg font-semibold text-center">상위 커뮤니티</p>
          </div>

          {/* 커뮤니티 리스트 */}
          <div>
            {topSubs?.map(sub => (
              <div
                key={sub.name}
                className="flex items-center px-4 py-2 text-xs border-b"
              >
                <Link href={`/r/${sub.name}`}>
                  <Image
                    src={sub.imageUrl}
                    className="rounded-full cursor-pointer"
                    alt="Sub"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href={`/r/${sub.name}`}
                  className="ml-2 font-bold hover:cursor-pointer"
                >
                  /r/{sub.name}
                </Link>
                <p className="ml-auto font-md">{sub.postCount}</p>
              </div>
            ))}
          </div>
          {authenticated && (
            <div className="w-full py-6 text-center">
              <Link
                href="/subs/create"
                className="w-full p-2 text-center text-white bg-gray-400 rounded"
              >
                커뮤니티 만들기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
