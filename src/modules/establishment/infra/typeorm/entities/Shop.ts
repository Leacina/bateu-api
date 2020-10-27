import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nm_conta: string;

  @Column()
  is_ativo: boolean;

  @Column()
  is_anuncio: boolean;

  @CreateDateColumn()
  dh_inc: Date;
}

export default Account;
