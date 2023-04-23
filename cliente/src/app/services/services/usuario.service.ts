import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { headers } from 'src/app/models/header';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //para acceder servicios http
  usuario1 = new Usuario();
  constructor(private http: HttpClient) { }
  listOne(id: any) {
    let dates = {
      'id': id
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/cliente/listOne/`, dates,{headers:headers});
  }
  VerificarUsuario(correo: any, password: any) {
    let usuario = {
      'nombre': correo,
      'pasword': password
    }
    //console.log(`${environment.API_URI}/cliente/login`)
    return this.http.post(`${environment.API_URI}/cliente/login`, usuario,{headers:headers});
  }
  verificarnombre(correo: any) {
    let usuario = {
      'nombre': correo,
    }
    //console.log(`${environment.API_URI}/cliente/find`)
    return this.http.post(`${environment.API_URI}/cliente/find`, usuario,{headers:headers});
  }
  recupera(correo: any, word: any) {
    let usuario = {
      'nombre': correo,
      'word': word
    }
    return this.http.post(`${environment.API_URI}/cliente/recover/`, usuario,{headers:headers});
  }
  createUsuario(correo: any, password: any, word: any) {
    let usuario = {
      'nombre': correo,
      'pasword': password,
      'word': word
    }
    return this.http.post(`${environment.API_URI}/cliente/create/`, usuario);
  }
  update(cliente:any){
    let clienteActual ={
        'id_cliente': cliente.id,
        'nombre': cliente.correo,
        'pasword': cliente.password,
        'word': cliente.word
    }
    return this.http.put(`${environment.API_URI}/cliente/update/`+cliente.id,clienteActual);

  }
    recovery(cliente:any){
      //console.log("mando a : ",cliente.id_cliente,cliente);
    return this.http.put(`${environment.API_URI}/cliente/update/`+cliente.id_cliente,cliente);

  }


}
