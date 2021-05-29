export class Pessoa {
  codigo: number;
  nome: string;
  senha: string;
  telefone: string;
  email: string;
  encargos: Array<Encargo>;
  ativo: Boolean;   
}

export class Encargo {
  codigo: number;
  nome: string;
}
