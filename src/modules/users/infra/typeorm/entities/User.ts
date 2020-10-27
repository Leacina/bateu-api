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

  id_conta: number;

  id_perfil: string;

  is_ativo: string;

  tp_usuario: string;

  id_loja: string;

  id_estabelecimento: number;

  telefone: string;
}

export default User;
