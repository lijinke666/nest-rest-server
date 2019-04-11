import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ROLES } from '../roles/interfaces/roles.interfaces';
import { ROLES as ROLES_CONSTANTS } from '../roles/constants/roles.constants';
import { Article } from '../article/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50, select: false })
  password: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column('enum', {
    default: ROLES_CONSTANTS.USER,
    enum: [ROLES_CONSTANTS.ADMIN, ROLES_CONSTANTS.USER],
  })
  role: ROLES;

  @OneToMany(type => Article, article => article.user)
  articles: Article;
}
