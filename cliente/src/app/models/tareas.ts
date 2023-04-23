export class Tareas{
    id: number;
    idCliente: number;
    nombre: string;
    descripcion:string;
    fechafin:string;
    //carmagos el servicio directamente en este modelo de datos 
    constructor() {
        this.id= 0;
        this.idCliente=0;
        this.nombre= '';
        this.descripcion='';
        this.fechafin='';
    }
}