import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ROLES } from 'src/roles/interfaces/roles.interfaces';
import { ROLES as ROLES_CONSTANTS } from 'src/roles/constants/roles.constants';
import { Article } from 'src/article/article.entity';

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
