export class CandidatoPayload {
    id!: number;
    nome!: string;
    cpf!: string;
    rg!: string;
    dataNasc: Date = new Date();
    sexo!: string;
    mae!: string;
    pai!: string;
    email!: string;
    cep!: string;;
    endereco!: string;;
    numero!: number;;
    bairro!: string;;
    cidade!: string;
    estado!: string;;
    telefoneFixo!: string;;
    celular!: string;
    altura!: number;
    peso!: number;
    tipoSanguineo!: string;
}