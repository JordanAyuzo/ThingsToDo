import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { Tareas } from 'src/app/models/tareas';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import * as XLSX from 'xlsx'
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';
import { environment } from 'src/app/environments/environment';
declare var $ : any;
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  tarmain=new Tareas()
  tarea = new Tareas();
  tareaModify = new Tareas();
  clienteid: any;
  lista: any;

liga: string = environment.API_URI_IMAGENES;
imgPrincipal: any;
uploadEvent :any;
file:any;
arrayBuffer:any;
exceljsondata:any;
pageSize = 5;
p = 1;

  constructor(private excelService: ExcelService,
              private tareaService: TareasService,
              private comunicacionService : ComunicacionService) {
    this.clienteid = localStorage.getItem("idUsuario")
    this.comunicacionService.observador$.subscribe(
      (msg)=>{
          if(msg == 101){
            this.tareaService.list(this.clienteid).subscribe((resTarea: any) => {
              this.lista = resTarea
            }
            );
          }
      }
    );
    this.tareaService.list(this.clienteid).subscribe((resTarea: any) => {
      this.lista = resTarea
    }
    );
  }
  addtarea() {
    this.tareaService.create(this.clienteid,this.tarea.nombre,this.tarea.descripcion,this.tarea.fechafin).subscribe((resTarea: any) => {
      }
      );
      this.tareaService.list(this.clienteid).subscribe((resTarea: any) => {
        this.lista = resTarea
      }
      );
  }
  borrar(dato:any){
    this.tareaService.delete(dato).subscribe((resTarea: any) => {
    }
    );
    this.tareaService.list(this.clienteid).subscribe((resTarea: any) => {
      this.lista = resTarea
    });
  }
  ngOnInit(){

    $(document).ready(function ()
    {
      $(".modal").modal();

    })  
  
  }
  opemModelView(dato:any){
    this.tareaService.listOne(this.clienteid,dato).subscribe((resUsuario: any) => {
      this.tareaModify.nombre=resUsuario.nombre
      if (resUsuario.descripcion== ""){
        this.tareaModify.descripcion= "¡Vaya! No Hay Nada Que Mostarar"
      }else{
        this.tareaModify.descripcion=resUsuario.descripcion
      }
      if (resUsuario.fecha_fin== ""){
        this.tareaModify.fechafin= "Sin Fecha Limite"
      }else{
        this.tareaModify.descripcion=resUsuario.descripcion
      }
      
      //this.clienteAux=resUsuario
      $('#modal3').modal();
      $('#modal3').modal("open");
  },
        (err: any) => console.error(err)
      );

  }
  opemModelEdit(dato:any){
    this.clienteid =localStorage.getItem("idUsuario")
    this.tareaService.listOne(this.clienteid,dato).subscribe((resUsuario: any) => {
      this.tareaModify.id=resUsuario.id_tarea
      this.tareaModify.nombre=resUsuario.nombre
      this.tareaModify.idCliente=resUsuario.id_cliente
      this.tareaModify.descripcion=resUsuario.descripcion
      this.tareaModify.fechafin=resUsuario.fecha_fin
      //this.clienteAux=resUsuario
      $('#modal2').modal();
      $('#modal2').modal("open");
  },
        (err: any) => console.error(err)
      );
    
  }  
  actualizarTarea() {
    this.tareaService.update(this.tareaModify).subscribe((resTarea: any) => {
      this.tareaService.list(this.clienteid).subscribe((resTarea: any) => {
        this.lista = resTarea
      }
      );
    }); 
  }
  cancelar(){
  }

  exportAsXLSX()
{ 
  let element = document.getElementById('tabla2');
  this.excelService.exportAsExcelFile(element, 'sample');
}


cargarExcel(event:any){
  if (event.target.files.length > 0) {
  this.file = event.target.files[0];
  this.uploadEvent = event;
  }
  this.file = event.target.files[0];
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(this.file);
  fileReader.onload = (e) => {
  this.arrayBuffer = fileReader.result;
  var data = new Uint8Array(this.arrayBuffer);
  var arr = new Array();
  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");
  var workbook = XLSX.read(bstr, { type: "binary" });
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true })
  }
  }
  migrar(){
    this.exceljsondata.map((dato: any) => {
    this.tarmain.nombre=dato.nombre
    this.tareaService.create(this.clienteid,this.tarmain.nombre,this.tarmain.descripcion,this.tarmain.fechafin).subscribe((resTarea: any) => {
    }
    );
    });
    this.tareaService.list(this.clienteid).subscribe((resTarea: any) => {
      this.lista = resTarea
    }
    );
  }
  dameNombre(img:any){
    if(img== 0)
      return this.liga+"/elements/descargar.png"
    else
    return this.liga+"/elements/subir.png"
  }
  


}


