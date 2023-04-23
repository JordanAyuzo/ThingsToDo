export class Clases{
    id_clase: number;
    nombre: string;
	id_cliente: number;
    //carmagos el servicio directamente en este modelo de datos 
    constructor() {
        this.id_clase= 0;
		this.id_cliente=0;
		this.nombre= ""
    }
}