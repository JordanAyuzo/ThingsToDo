import { Component} from '@angular/core';
import { ObjetivosService } from 'src/app/services/objetivos/objetivos.service';
import { Objetivos } from 'src/app/models/objetivos';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var $ : any;
@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent {
objMain = new Objetivos
objMod = new Objetivos
idCliente:any
lista:any
  constructor(private excelService: ExcelService,
              private objetivoService: ObjetivosService,
              private comunicacionService : ComunicacionService){
    this.idCliente = localStorage.getItem("idUsuario")
    this.comunicacionService.observador$.subscribe(
      (msg)=>{
          if(msg == 101){
            this.objetivoService.list(this.idCliente).subscribe((resObjetivo: any) => {
              this.lista = resObjetivo
            }
            );
          }
      }
    );



    this.objetivoService.list(this.idCliente).subscribe((resObjetivo: any) => {
      this.lista = resObjetivo
    }
    );
  }
  addObjetivo(){
    this.objetivoService.create(this.idCliente,this.objMain).subscribe((resTarea: any) => {
    }
    );
    this.objetivoService.list(this.idCliente).subscribe((resTarea: any) => {
      this.lista = resTarea
    }
    );
  }
  borrar(idObjetivo:any){ 
    console.log(idObjetivo);
    this.objetivoService.delete(idObjetivo).subscribe((resTarea: any) => {
    }
    );
    this.objetivoService.list(this.idCliente).subscribe((resTarea: any) => {
      this.lista = resTarea
    }); 
  }
  opemModelView(idObjetivo:any){
    this.objetivoService.listOne(idObjetivo).subscribe((resUsuario: any) => {
      this.objMod=resUsuario
      if (this.objMod.fecha_fin=="")
        this.objMod.fecha_fin="Sin Limite"
      //this.clienteAux=resUsuario
      $('#modal5').modal();
      $('#modal5').modal("open");
  },
        (err: any) => console.error(err)
      );
  }
  opemModelEdit(idObjetivo:any){
    this.objetivoService.listOne(idObjetivo).subscribe((resUsuario: any) => {

      this.objMod=resUsuario
      $('#modal4').modal();
      $('#modal4').modal("open");
  },
        (err: any) => console.error(err)
      );
    
  }
 actualizarObjetivo(){
  this.objetivoService.update(this.objMod).subscribe((resTarea: any) => {
    this.objetivoService.list(this.idCliente).subscribe((resTarea: any) => {
      this.lista = resTarea
    }
    );
  }); 
 }

 exportAsXLSX()
{ 
  let element = document.getElementById('tabla1');
  this.excelService.exportAsExcelFile(element, 'sample');
}
}
