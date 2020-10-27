import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  ds_login: string;

  @Column()
  nm_usuario: string;

  @Column()
  ds_senha: string;
}

export default User;
