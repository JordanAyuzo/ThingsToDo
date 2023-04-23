import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NoteSave } from 'src/app/models/noteSave';
import { NotesService } from 'src/app/services/notes/notes.service';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{
  noteSave=new NoteSave();
  id:any
  constructor(private notesService:NotesService){
    this.id =  localStorage.getItem("idUsuario");
    this.noteSave.id_cliente=this.id;
    this.notesService.list(this.id).subscribe((respuesta: any) => {
      if (respuesta!= null){
        this.noteSave.nota=respuesta[0].nota;
      }
    },
      (err: any) => console.error(err)
    );

  }
  create(){
    this.notesService.create(this.noteSave).subscribe((respuesta: any) => {
      
    },
      (err: any) => console.error(err)
    );
  }
  update(){
    this.notesService.update(this.noteSave).subscribe((respuesta: any) => {
    },
      (err: any) => console.error(err)
    ); 
  }

  action(){
    this.notesService.list(this.id).subscribe((respuesta: any) => {
      if (respuesta== null){
        this.create()
      }else{
        this.update()
      }
    },
      (err: any) => console.error(err)
    );
  }
  
}
