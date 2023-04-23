import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { headers } from 'src/app/models/header';

@Injectable({
  providedIn: 'root'
})
export class DiasService {

  constructor(private http: HttpClient) { }

  look(data: any) {
    //console.log(`${environment.API_URI}/cliente/login`)
    let datos = {
      'nombre':data.dia,
    }
    return this.http.post(`${environment.API_URI}/dia/lookName`, datos,{headers:headers});
  }
  create(idc: any,idd:any) {
    
    let datos = {
      "id_clase": idc,
	    "id_dia": idd
    }
    return this.http.post(`${environment.API_URI}/dia/create`, datos);
  }
  list(){
    return this.http.get(`${environment.API_URI}/dia/list`,{headers:headers});
  }

  delete(idRelacion: any ){
    return this.http.delete(`${environment.API_URI}/dia/delete/`+ idRelacion);
  }
}
