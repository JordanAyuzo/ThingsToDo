import { Injectable } from '@angular/core';
import { Objetivos } from 'src/app/models/objetivos';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headers } from 'src/app/models/header';
@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  objetivo = new Objetivos();
  constructor(private http: HttpClient) { }
  list(id: any) {
    let datos = {
      'idCliente': id,
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/objetivo/list`, datos,{headers:headers});
  }
  listOne(id_Objetivo:any) {
    let dates = {
      'idObjetivo':id_Objetivo, 
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/objetivo/listOne/`,dates,{headers:headers});
  }
  create(idCliente:any,data: any) {
    //console.log(`${environment.API_URI}/cliente/login`)
    let datos = {
      'id_cliente': idCliente,
      'nombre':data.nombre,
      'fecha_fin':data.fecha_fin,
      'prioridad':data.prioridad,
      'progreso':data.progreso
    }
    return this.http.post(`${environment.API_URI}/objetivo/create`, datos);
  }
  delete(id: any) {
    let datos = {
      "id_objetivo": id
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/objetivo/delete`, datos);
  }
  update(objetivo:any){
    return this.http.put(`${environment.API_URI}/objetivo/update/`+objetivo.id_objetivo,objetivo);

  }
}
