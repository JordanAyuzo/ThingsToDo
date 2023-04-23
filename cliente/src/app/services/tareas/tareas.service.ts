import { Injectable } from '@angular/core';
import { Tareas } from 'src/app/models/tareas';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headers } from 'src/app/models/header';
@Injectable({
  providedIn: 'root'
})
export class TareasService {
  tarea = new Tareas();
  constructor(private http: HttpClient) { }
  create(id: any,nombre:any,descripcion:any,fecha:any) {
    let datos = {
      "id_cliente": id,
      "nombre": nombre,
      "descripcion":descripcion,
		  "fecha_fin":fecha
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/tarea/create`, datos);
  }
  delete(id: any) {
    let datos = {
      "id_tarea": id
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/tarea/delete`, datos);
  }
  update(cliente:any){
    let datos = {
      'id_cliente':cliente.idCliente,
      'id_tarea':cliente.id,
      'nombre':cliente.nombre,
      'descripcion':cliente.descripcion,
      'fecha_fin':cliente.fechafin
    }
    return this.http.put(`${environment.API_URI}/tarea/update/`+cliente.id,datos);

  }
  listOne(idUsuario: any,idtarea:any) {
    let dates = {
      'idCliente': idUsuario,
      'idTarea':idtarea, 
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/tarea/listOne/`, dates,{headers:headers});
  }
  list(id: any) {
    let datos = {
      'idCliente': id,
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/tarea/list`, datos,{headers:headers});
  }
}
