import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { Tareas } from 'src/app/models/tareas';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
declare var $ : any;
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  tarea = new Tareas();
  tareaModify = new Tareas();
  clienteid: any;
  lista: any;
  constructor(private tareaService: TareasService,
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
        console.log(resTarea);
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
    console.log("que esta pasando")
    this.tareaService.listOne(this.clienteid,dato).subscribe((resUsuario: any) => {
      console.log(resUsuario)
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
      console.log(resUsuario)
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
}
