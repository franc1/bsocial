import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdDate: Date;

  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @ApiProperty()
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'first_name',
  })
  firstName: string;

  @ApiProperty()
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'last_name',
  })
  lastName: string;

  @ApiProperty()
  @Column('varchar', {
    nullable: false,
    length: 100,
    name: 'username',
    unique: true,
  })
  username: string;

  @ApiProperty()
  @Column('varchar', {
    nullable: false,
    length: 150,
    name: 'email',
    unique: true,
  })
  email: string;

  @Exclude()
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
  followUsers: User[] | number[];

  @ManyToMany(() => User, (user) => user.followUsers)
  followedByUsers: User[] | number[];
}
