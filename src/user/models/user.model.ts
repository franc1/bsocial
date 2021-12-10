import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment } from '../../comment/models/comment.model';
import { Post } from '../../post/models/post.model';

@Entity('user')
export class User {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdDate: Date;

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'first_name',
  })
  firstName: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'last_name',
  })
  lastName: string;

  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'username',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'password',
  })
  password: string;

  @OneToMany(() => Post, (post) => post.createdBy, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.createdBy, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.followedByUsers)
  @JoinTable({
    name: 'user_follower',
    joinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followed_id',
      referencedColumnName: 'id',
    },
  })
  followUsers: User[];

  @ManyToMany(() => User, (user) => user.followUsers)
  followedByUsers: User[];
}
