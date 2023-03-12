import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  hasPassword() {
    this.password = hashSync(this.password, 10);
  }

  constructor(user?: Partial<UserEntity>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.createdAt = user?.createdAt;
    this.updateAt = user?.updateAt;
    this.deletedAt = user?.deletedAt;
  }
}
