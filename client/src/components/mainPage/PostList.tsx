import * as React from 'react';
import useSWRInfinite from 'swr/infinite';
import { Post } from '../../types';
import { useEffect, useState } from 'react';
import PostCard from '../common/PostCard';
import Shimmer from '../common/Shimmer';

const PostList = () => {
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
    <>
      <div className="w-full md:mr-3 md:w-7/12 mx-auto my-4 h-auto">
        {isInitialLoading && <Shimmer />}
        {posts.map(post => (
          <PostCard post={post} key={post.identifier} mutate={mutate} />
        ))}
        {isValidating && posts.length > 0 && <Shimmer />}
      </div>
    </>
  );
};

export default PostList;
