import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
