import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http : HttpClient) { }
  guardarImagen(id:any, src:any, carpeta:any){
    //src=null;
    console.log(src,id,carpeta);
    return this.http.post(`${environment.API_URI_IMAGENES}/uploadImagen`, {"id": id,
    "src": src, "carpeta":carpeta});
    }
}
