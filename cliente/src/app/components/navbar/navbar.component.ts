import { Component, OnInit, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { UsuarioService } from 'src/app/services/services/usuario.service';
import { Usuario } from "../../models/usuario";
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { Tareas } from 'src/app/models/tareas';
import { ObjetivosService } from 'src/app/services/objetivos/objetivos.service';
import { Objetivos } from 'src/app/models/objetivos';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { Clases } from 'src/app/models/clases';
import { ClasDia } from 'src/app/models/clas-dia';
import { DiasService } from 'src/app/services/dias/dias.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';
import { environment } from 'src/app/environments/environment';
declare var M: any;
declare var $: any;

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, Option);
});

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  clienteA = new Usuario();
  clienteC = new Usuario();
  tareaCrear = new Tareas();
  clasDia = new ClasDia();
  objetivoCrear = new Objetivos();
  clasesCrear = new Clases();
  listClases: any;
  listClases2: any;
  listaTarea: any;
  dias: any;
  id: any
  correo: any
  password: any
  word: any
  currentDate: any;
  liga: string = environment.API_URI_IMAGENES;
  imgPrincipal: any;
  fileToUpload : any;
  enTareas: boolean;
  ngAfterViewInit() {
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {});
  }
  openCalendar() {
    M.Datepicker.getInstance().open();
  }
  
  constructor(private usuarioService: UsuarioService,
    private imagenesService:ImagenesService,
    private router: Router,
    private tareaService: TareasService,
    private objetivoService: ObjetivosService,
    private clasesService: ClasesService,
    private diasService: DiasService,
    private comunacionesService: ComunicacionService,
  ) {
    this.enTareas = this.router.url.includes('/tareas');
    this.id = localStorage.getItem("idUsuario")
    this.tareaService.list(this.id).subscribe((resTarea: any) => {
      this.listaTarea = resTarea
    }
    );
  }
  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'mediumDate', 'en-US');
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
    var elems = document.querySelectorAll('.tabs');
    var instances = M.Tabs.init(elems, {});
    M.Dropdown.init(document.querySelectorAll('.sidenav'), {});
    $(document).ready(function () {
      console.log();
      
      $(".modal").modal();
    })
  }
  openEditUsuario() {
    this.usuarioService.listOne(this.id).subscribe((resUsuario: any) => {
      this.correo = resUsuario.nombre
      this.password = resUsuario.pasword
      this.word = resUsuario.word
      //this.clienteAux=resUsuario
      $('#modal1').modal();
      $('#modal1').modal("open");
    },
      (err: any) => console.error(err)
    );
  }
  actualizarCliente() {
    this.clienteA.id = this.id
    //if (this.clienteA.correo == "")
    //  this.clienteA.correo = this.correo
    //if (this.clienteA.password == "")
      //this.clienteA.password = this.password
    //if (this.clienteA.word == "")
    //  this.clienteA.word = this.word
    //this.usuarioService.update(this.clienteA).subscribe((resClientes: any) => {
    // this.clienteA = this.clienteC
    //},
    //  (err: any) => console.error(err)
    //);
  }
  cancelar() {
    this.clienteA = this.clienteC
  }
  goTareas() {
    this.router.navigate(['/tareas']);
  }
  goObjetivos() {
    this.router.navigate(['objetivos'])
  }
  goClases() {
    this.router.navigate(['cal'])
  }
  goNotes(){
    this.router.navigate(['notes'])
  }
  goMenu(){
    this.router.navigate(['menu'])
  }
  goLogin(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
  modalTareas(option: any) {
    if (option == 1) {
      $('#editTareaM').modal();
      $('#editTareaM').modal("open");
    }
    if (option == 2) {
      $('#modiTareaM').modal();
      $('#modiTareaM').modal("open");

    }
    if (option == 3) { }
  }
  modalObjetivos(option: any) {
    if (option == 1) {
      $('#editObjetivoM').modal();
      $('#editObjetivoM').modal("open");
    }
    if (option == 2) {

    }
    if (option == 3) { }
  }

  modalClases(option: any) {
    if (option == 1) {
      $('#editClasesM').modal();
      $('#editClasesM').modal("open");
    }
    if (option == 2) {
      this.diasService.list().subscribe((resDia: any) => {
        this.listClases = resDia;
        $('#verClasesM').modal();
        $('#verClasesM').modal("open");
      }
      );

    }
    if (option == 3) {
      this.clasesService.list().subscribe((resClase: any) => {
        this.listClases2 = resClase;
        $('#viewClass').modal();
        $('#viewClass').modal("open");
      }
      );
    }
    if (option == 4) {
      $('#editDiaM').modal();
      $('#editDiaM').modal("open");
    }
  }

  accionesTareas(option: any) {
    if (option == 1) {
      this.tareaService.create(this.id, this.tareaCrear.nombre, this.tareaCrear.descripcion, this.tareaCrear.fechafin).subscribe((resTarea: any) => {
        this.comunacionesService.enviar(101)
      }
      );
    }

  }
  accionesObjetivos(option: any) {
    if (option == 1) {
      this.objetivoService.create(this.id, this.objetivoCrear).subscribe((resTarea: any) => {
        this.comunacionesService.enviar(101)
      }
      );
    }
  }
  accionesClases(option: any) {
    if (option == 1) {
      this.clasesService.create(this.id, this.clasesCrear).subscribe((resTarea: any) => {
      }
      );
    }
    if (option == 2) {
      this.clasesService.look(this.clasDia).subscribe((resclase: any) => {
        this.diasService.look(this.clasDia).subscribe((resDia: any) => {
          this.diasService.create(resclase[0].id_clase, resDia[0].id_dia).subscribe((rescrear: any) => {
          }
          );
        }
        );
      }
      );
    }
  }
  eliminarRelacion(idRelacion: any) {
    this.diasService.delete(idRelacion).subscribe((rescrear: any) => {
      $('#verClasesM').modal();
      $('#verClasesM').modal("close");
    }
    );
  }
  eliminarClass(id_clase:any){    
    this.clasesService.delete(id_clase).subscribe((resdelete: any) => {
      $('#viewClass').modal();
      $('#viewClass').modal("close");
      
    }
    );
  }
  cargandoImagen(files:any,carpeta:any){
    this.imgPrincipal=null;
    this.fileToUpload = files.files[0];
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
    this.imagenesService.guardarImagen(this.id, blob,carpeta).subscribe(
    (res: any) =>
    {
    this.imgPrincipal = blob;
    },
    err => console.error(err));
    })    
  }
  getFileBlob(file:any){
var reader = new FileReader();
return new Promise(function (resolve, reject) {
reader.onload = (function (thefile) {
return function (e:any) {
resolve(e.target.result);
};
})(file);
reader.readAsDataURL(file);
});
}

  dameNombre(id:any){
    if(this.imgPrincipal != null){
      return this.imgPrincipal
    }
    return this.liga+"/perfil/"+this.id+".jpg"
  }
  onImgError(event:any){
    event.target.src=this.liga+"/perfil/profile.png";
  }

}