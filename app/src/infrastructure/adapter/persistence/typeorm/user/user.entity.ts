import { UserActiveStatus, UserRoles } from '@/core/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class TypeOrmUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    enum: UserRoles,
  })
  role: UserRoles;

  @Column({ enum: UserActiveStatus })
  isActive: UserActiveStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
