import { Component } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from 'src/app/services/services/usuario.service';
@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent {
  usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) {
  }
  crearUsuario() {
    if (this.usuario.correo == "" || this.usuario.password == "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Todos Los Campos son Obligatorios",
        showConfirmButton: true
      })
    }
    else {
      this.usuarioService.verificarnombre(this.usuario.correo).subscribe((resUsuario: any) => {
        //console.log(resUsuario);
        if (resUsuario == null) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])[A-Za-z\d!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~]{8,}$/;
          if(!passwordRegex.test(this.usuario.password)){
            Swal.fire({
              position: "center",
              icon: "info",
              title: "La contraseña debe tener al menos una letra, un número y un carácter especial, y debe tener al menos 8 caracteres",
              showConfirmButton: true
            })    
          }else{
            this.usuarioService.createUsuario(this.usuario.correo, this.usuario.password,this.usuario.word).subscribe((resUsuario: any) => {
            //console.log(resUsuario);
            if (resUsuario.affectedRows == 0) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Hay Un error De Nuestro Lado,Intentelo de Nuevo.",
                showConfirmButton: true
              })
            }
            else {
              this.router.navigate(['login'])
            }
          },
            (err: any) => console.error(err)
          );
          }          
        } else {
          Swal.fire({
            position: "center",
            icon: "info",
            title: "El Usuario No está Disponible",
            showConfirmButton: true
          })
        }
      },
        (err: any) => console.error(err)
      );
    }
  }

}
