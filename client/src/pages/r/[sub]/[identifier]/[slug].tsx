import Axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Comment, Post } from '../../../../types/types';
import { useAuthState } from '../../../../context/auth';
import CreateComment from '../../../../components/postPage/CreateComment';
import CommentList from '../../../../components/postPage/CommentList';
import Contents from '../../../../components/postPage/Contents';

const PostPage = () => {
  const router = useRouter();
  const { identifier, slug } = router.query;
  const { authenticated } = useAuthState();

  const { data: post, mutate: postMutate } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );
  const { data: comments, mutate: commentMutate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
  );

  const vote = async (value: number, comment?: Comment) => {
    if (!authenticated) router.push('/login');

    // 이미 클릭 한 vote 버튼을 눌렀을 시에는 reset
    if (
      (!comment && value === post?.userVote) ||
      (comment && comment.userVote === value)
    ) {
      value = 0;
    }

    try {
      await Axios.post('/votes', {
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });
      postMutate();
      commentMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 mt-10 mx-auto bg-[#ebf3f9] rounded border-4 border-[#91bfe2] drop-shadow-2xl md:w-2/3">
      {post && (
        <>
          <Contents post={post} vote={vote} />
          <CreateComment post={post} commentMutate={commentMutate} />
          <CommentList
            comments={comments}
            commentMutate={commentMutate}
            vote={vote}
          />
        </>
      )}
    </div>
  );
};

export default PostPage;
