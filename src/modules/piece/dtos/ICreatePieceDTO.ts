export default interface ICreatePieceDTO {
  id_conta: number;
  id_estabelecimento: number;
  id_loja: number;
  id_marca: number;
  id_modelo: number;
  id_categoria: number;
  nm_peca: string;
  valor_peca: number;
  valor_peca_oficina: number;
  valor_peca_seguradora: number;
  qt_disponivel: number;
  qt_estoque: number;
  ano_inicial: number;
  codigo_peca: string;
  is_promocional: string;
  altura?: number;
  largura?: number;
  comprimento?: number;
  peso_bruto?: number;
  cor?: string;
  condicao_peca?: string;
  ds_imagem?: string;
  ds_imagem_dois?: string;
  ds_imagem_tres?: string;
  ano_final?: string;
  descricao_peca?: string;
}
