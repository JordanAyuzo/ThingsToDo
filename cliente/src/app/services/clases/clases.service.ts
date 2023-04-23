import { Injectable } from '@angular/core';
import { Objetivos } from 'src/app/models/objetivos';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headers } from 'src/app/models/header';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  constructor(private http: HttpClient) { }
  create(idCliente:any,data: any) {
    //console.log(`${environment.API_URI}/cliente/login`)
    let datos = {
      'id_cliente': idCliente,
      'nombre':data.nombre,
    }
    return this.http.post(`${environment.API_URI}/clases/create`, datos);
  }
  list(){
    return this.http.get(`${environment.API_URI}/clases/list`,{headers:headers});
  }

  look(data: any) {
    //console.log(`${environment.API_URI}/cliente/login`)
    let datos = {
      'nombre':data.clase,
    }
    return this.http.post(`${environment.API_URI}/clases/lookName`, datos,{headers:headers});
  }
  delete(idClase: any ){
    return this.http.delete(`${environment.API_URI}/clases/delete/`+ idClase,);
  }
}
