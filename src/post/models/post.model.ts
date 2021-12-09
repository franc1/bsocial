import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment } from '../../comment/models/comment.model';
import { User } from '../../user/models/user.model';

@Entity('post')
export class Post {
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

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | number;

  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  comments: Comment[];
}
