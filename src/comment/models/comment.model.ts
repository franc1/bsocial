import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from '../../post/models/post.model';
import { User } from '../../user/models/user.model';

@Entity('comment')
export class Comment {
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

  @Column('text', {
    nullable: false,
    name: 'content',
  })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post | number;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | number;
}
