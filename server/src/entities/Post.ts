import { Exclude, Expose } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Sub from './Sub';
import User from './User';
import BaseEntity from './Entity';
import Vote from './Vote';
import Comment from './Comment';
import { makeId } from '../utils/helpers';
import { slugify } from 'transliteration';

@Entity('posts')
export default class Post extends BaseEntity {
  @Index()
  @Column()
  identifier: string; // 7 Character id

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column()
  subName: string;

  @Column()
  username: string;

  @ManyToOne(() => User, user => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Sub, sub => sub.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub;

  @Exclude()
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Exclude()
  @OneToMany(() => Vote, vote => vote.post)
  votes: Vote[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : null;
  }

  @Expose() get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug}`;
  }

  @Expose() get commentCount(): number {
    return this.comments?.length;
  }

  @Expose() get voteScore(): number {
    return this.votes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
  }

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex(v => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
