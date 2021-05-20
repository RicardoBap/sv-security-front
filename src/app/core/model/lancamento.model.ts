// export class Pessoa {
//     codigo: number;
//     nome: string;
//     ativo: true;
// }

import { Categoria } from "./categoria.model";
import { PessoaResumoModel } from "./pessoaResumoModel.model";

// export class Categoria {
//     codigo: number;
// }

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