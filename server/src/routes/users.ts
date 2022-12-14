import { Request, Response, Router } from 'express';
import { userMiddleware } from '../middlewares';
import { Post, Comment, User } from '../entities';

const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneOrFail({
      where: { username: req.params.username },
      select: ['username', 'createdAt'],
    });

    const posts = await Post.find({
      where: { username: user.username },
      relations: ['comments', 'votes', 'sub'],
    });

    const comments = await Comment.find({
      where: { username: user.username },
      relations: ['post'],
    });

    if (res.locals.user) {
      const { user } = res.locals;
      posts.forEach(p => p.setUserVote(user));
      comments.forEach(c => c.setUserVote(user));
    }

    console.log({ ...comments });
    const userData = [];

    posts.forEach(p => userData.push({ type: 'Post', ...p.toJSON() }));
    comments.forEach(c => userData.push({ type: 'Comment', ...c.toJSON() }));

    console.log(userData);
    userData.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });

    return res.json({ user, userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const router = Router();
router.get('/:username', userMiddleware, getUserData);

export default router;
