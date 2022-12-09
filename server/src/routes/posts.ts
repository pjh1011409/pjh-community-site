import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';
import multer, { FileFilterCallback } from 'multer';
import { Request, Response, Router } from 'express';
import Sub from '../entities/Sub';
import Post from '../entities/Post';
import Comment from '../entities/Comment';
import { makeId } from '../utils/helpers';
import { unlinkSync } from 'fs';
import path from 'path';

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  if (title.trim() === '') {
    return res.status(400).json({ title: '제목은 비워둘 수 없습니다.' });
  }

  const user = res.locals.user;

  try {
    const subRecord = await Sub.findOneByOrFail({ name: sub });
    const post = new Post();
    post.title = title;
    post.body = body;
    post.user = user;
    post.sub = subRecord;

    await post.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneOrFail({
      where: { identifier, slug },
      relations: ['sub', 'votes'],
    });

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    return res.send(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
  }
};

const getPosts = async (req: Request, res: Response) => {
  const currentPage: number = (req.query.page || 0) as number;
  const perPage: number = (req.query.count || 8) as number;

  try {
    const posts = await Post.find({
      order: { createdAt: 'DESC' },
      relations: ['sub', 'votes', 'comments'],
      skip: currentPage * perPage,
      take: perPage,
    });

    if (res.locals.user) {
      posts.forEach(p => p.setUserVote(res.locals.user));
    }

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneByOrFail({ identifier, slug });
    const postDelete = await Post.createQueryBuilder()
      .delete()
      .from(Post)
      .where({ identifier: post.identifier })
      .execute();

    if (!postDelete) return;

    return res.json(postDelete);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '문제가 발생하였습니다.' });
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (_, file, callback) => {
      const name = makeId(10);
      callback(null, name + path.extname(file.originalname));
    },
  }),

  fileFilter: (_, file: any, callback: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('이미지가 아닙니다.'));
    }
  },
});

const uploadPostImage = async (req: Request, res: Response) => {
  const post: Post = res.locals.post;

  console.log('post', res.locals.post);
  try {
    const type = req.body.type;

    if (type !== 'image') {
      if (!req.file?.path) {
        return res.status(400).json({ error: '유효하지 않는 파일입니다.' });
      }

      unlinkSync(req.file.path);
      return res.status(400).json({ error: '잘못된 유형입니다.' });
    }

    let oldImageUrn = '';

    if (type === 'image') {
      oldImageUrn = post.imageUrn || '';
      post.imageUrn = req.file?.filename || '';
    }
    await post.save();

    if (oldImageUrn !== '') {
      const fullFilename = path.resolve(
        process.cwd(),
        'public',
        'images',
        oldImageUrn
      );
      unlinkSync(fullFilename);
    }

    console.log('post', post);
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생하였습니다' });
  }
};

const createPostComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const body = req.body.body;
  try {
    const post = await Post.findOneByOrFail({ identifier, slug });
    const comment = new Comment();
    comment.body = body;
    comment.user = res.locals.user;
    comment.post = post;

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    await comment.save();
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
  }
};

const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneByOrFail({ identifier, slug });
    const comments = await Comment.find({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
      relations: ['votes'],
    });
    if (res.locals.user) {
      comments.forEach(c => c.setUserVote(res.locals.user));
    }

    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

const deletePostComment = async (req: Request, res: Response) => {
  const { identifier } = req.params;
  try {
    const post = await Comment.findOneByOrFail({ identifier });
    const comments = await Comment.createQueryBuilder()
      .delete()
      .from(Comment)
      .where({ identifier: post.identifier })
      .execute();

    if (!comments) return;

    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '문제가 발생하였습니다.' });
  }
};

const updatePostComment = async (req: Request, res: Response) => {
  const { identifier } = req.params;
  const body = req.body.body;

  try {
    const post = await Comment.findOneByOrFail({ identifier });
    const comments = await Comment.createQueryBuilder()
      .update()
      .set({ body: body })
      .where({ identifier: post.identifier })
      .execute();

    if (!comments) return;

    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '문제가 발생하였습니다.' });
  }
};

const router = Router();
router.post('/', userMiddleware, authMiddleware, createPost);
router.get('/', userMiddleware, getPosts);
router.get('/:identifier/:slug', userMiddleware, getPost);
router.delete('/:identifier/:slug', userMiddleware, deletePost);

router.post(
  '/:title/upload',
  userMiddleware,
  authMiddleware,
  upload.single('file'),
  uploadPostImage
);

router.post('/:identifier/:slug/comments', userMiddleware, createPostComment);
router.get('/:identifier/:slug/comments', userMiddleware, getPostComments);
router.put('/:identifier/:slug/comments', userMiddleware, updatePostComment);
router.delete('/:identifier/:slug/comments', userMiddleware, deletePostComment);

export default router;
