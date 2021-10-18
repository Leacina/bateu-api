export default interface ICreateBudgetItemDTO {
  id_cotacao: number;
  descricao_peca: string;
  identificador_cotacao: string;
  quantidade_peca: number;
  situacao: string;
  condicao_peca: string;
  observacao: string;
  dh_inc: Date;
}
