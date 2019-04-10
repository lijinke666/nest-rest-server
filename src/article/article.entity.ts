import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  title: string;

  @Column('text')
  content: string;

  @Column('int', {
    select: false
  })
  userId: number;

  @ManyToOne(type => User, user => user.articles)
  user: User;
}
