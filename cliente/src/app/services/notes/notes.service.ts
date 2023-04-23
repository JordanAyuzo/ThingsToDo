import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headers } from 'src/app/models/header';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) { 


  }
  create(data: any) {
    return this.http.post(`${environment.API_URI}/notes/create`, data);
  }
  list(id:any){
  
    return this.http.get(`${environment.API_URI}/notes/list/` + id,{headers:headers});
  }
  update(date:any){
    return this.http.put(`${environment.API_URI}/notes/update/`+date.id_cliente,date)
  }
}
