import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_sistema_usuario')
class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  ds_login: string;

  @Column()
  nm_usuario: string;

  @Column()
  ds_senha: string;

  @Column()
  id_conta: number;

  @Column()
  id_perfil: number;

  @Column()
  is_ativo: string;

  @Column()
  tp_usuario: string;

  @Column()
  id_loja: number;

  @Column()
  id_estabelecimento: number;

  @Column()
  telefone: string;
}

export default User;
