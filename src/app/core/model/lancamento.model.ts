import { Categoria } from "./categoria.model";
import { PessoaResumoModel } from "./pessoaResumoModel.model";

export class Lancamento {
    codigo: number;
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new PessoaResumoModel();
    categoria = new Categoria();
}