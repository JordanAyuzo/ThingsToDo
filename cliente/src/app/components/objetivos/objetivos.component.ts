import { Component} from '@angular/core';
import { ObjetivosService } from 'src/app/services/objetivos/objetivos.service';
import { Objetivos } from 'src/app/models/objetivos';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';
import { environment } from 'src/app/environments/environment';
import * as XLSX from 'xlsx'
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
liga: string = environment.API_URI_IMAGENES;
imgPrincipal: any;
uploadEvent :any;
file:any;
arrayBuffer:any;
exceljsondata:any;
pageSize = 5;
p = 1;
  constructor(private excelService: ExcelService,
              private objetivoService: ObjetivosService,
              private comunicacionService : ComunicacionService,
              private imagenesService:ImagenesService){
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
    this.objetivoService.list(this.idCliente).subscribe((resTarea: any) => {
      this.lista = resTarea
    }
    );
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
dameNombre(img:any){
  if(img== 0)
    return this.liga+"/elements/descargar.png"
  else
  return this.liga+"/elements/subir.png"
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
console.log(dato);
this.objMain.nombre=dato.nombre
this.objetivoService.create(this.idCliente,this.objMain).subscribe((resTarea: any) => {
}
  );
});
this.objetivoService.list(this.idCliente).subscribe((resTarea: any) => {
  this.lista = resTarea
}
);
}

}
