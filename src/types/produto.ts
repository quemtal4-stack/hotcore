export type TipoProduto =
  | "ingresso"
  | "livro"
  | "kit"
  | "clube"
  | "camisa"
  | "produto-loja";

export type Produto = {
  id: string;
  titulo: string;
  descricao: string;
  valor: number;
  valorMembro?: number;
  imagem?: string;
  tipo: TipoProduto;
  bloqueado?: boolean;
  disponivel?: boolean;
};
