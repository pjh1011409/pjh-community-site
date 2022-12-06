import { CommonExecOptions } from 'child_process';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './Entity';
import Post from './Post';
import User from './User';
import Comment from './Comment';

@Entity('votes')
export default class Vote extends BaseEntity {
  @Column()
  value: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column()
  username: string;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => Post, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => Comment, {
    onDelete: 'CASCADE',
  })
  comment: Comment;
}
