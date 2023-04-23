export class Objetivos{
    id_objetivo: number;
	id_cliente: number;
	nombre: string;
	fecha_fin:string;
	prioridad: number;
	progreso: Number
    //carmagos el servicio directamente en este modelo de datos 
    constructor() {
        this.id_objetivo= 0;
		this.id_cliente=0;
		this.nombre= "";
		this.fecha_fin= "";
		this.prioridad= 0;
		this.progreso= 0
    }
}