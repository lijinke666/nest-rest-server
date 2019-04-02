import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from 'src/roles/interfaces/roles.interfaces';
import { ROLES as ROLES_CONSTANTS } from 'src/roles/constants/roles.constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 11 })
  phone: string;

  @Column('enum', {
    default: ROLES_CONSTANTS.USER,
    enum: [ROLES_CONSTANTS.ADMIN, ROLES_CONSTANTS.USER],
  })
  role: ROLES;
}
