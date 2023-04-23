export class Usuario{
    id: number;
    password: string;
    correo: string;
    word:string;
    //carmagos el servicio directamente en este modelo de datos 
    constructor() {
    this.id = 0;
    this.correo = '';
    this.password = '';
    this.word = '';
    }
}