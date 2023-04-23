import { Component } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
//importamos el servicio
import { UsuarioService } from 'src/app/services/services/usuario.service';
import { Usuario } from "../../models/usuario";
import { CorreoService } from 'src/app/services/correo/correo.service';
import { ImagenesService } from 'src/app/services/imagenes/imagenes.service';
import { environment } from 'src/app/environments/environment';
declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  liga: string = environment.API_URI_IMAGENES;
  imgPrincipal: any;
  fileToUpload : any;
  //creamos la varible
  usuario = new Usuario();
  constructor(private imagenesService:ImagenesService,private correoService:CorreoService,private usuarioService: UsuarioService, private router: Router) {
    this.imgPrincipal = null;
  }
  ngOnInit(){

    $(document).ready(function ()
    {
      $(".modal").modal();

    })  
  
  }
  ingresar(){
    console.log ("ingresar")
  }
  verificarUsuario() {
    if(this.usuario.correo=="" || this.usuario.password==""){
      Swal.fire({
        position:"center",
        icon:"warning",
        title:"Todos Los Campos son Obligatorios.",
        showConfirmButton:true
      })
    }else{
      this.usuarioService.VerificarUsuario(this.usuario.correo, this.usuario.password).subscribe((resUsuario: any) => {
        if (resUsuario == null){
          Swal.fire({
            position:"center",
            icon:"error",
            title:"Usuario o contraseña inválido",
            showConfirmButton:true
          })
        }else{
          localStorage.setItem("idUsuario",resUsuario.id_cliente+ "")
          this.router.navigate(['menu'])
        }
    },
          (err: any) => console.error(err)
        );
    }
  }
  CrearUsuario(){
    this.router.navigate(['logup'])
  }
  modalOlvideContrasenia(){
    $('#modalOlvContra').modal();
    $('#modalOlvContra').modal("open");
    
  } 
  cambiarContrasenya(){
    this.usuarioService.verificarnombre(this.usuario.correo).subscribe((resUsuario: any) => {
      if (resUsuario == null){
        Swal.fire({
          position:"center",
          icon:"error",
          title:"Necesitas ingresar el correo con el que te registraste",
          showConfirmButton:true
        })
      }else{
        this.correoService.enviarCorreoRecuperarContrasenya(this.usuario).subscribe((resUsuario: any) => {
          console.log(resUsuario);
        }, (err: any) => console.error(err));
      }
  },
        (err: any) => console.error(err)
      );
  }

}
