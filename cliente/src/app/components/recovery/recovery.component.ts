import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from 'src/app/services/services/usuario.service';
import { CorreoService } from 'src/app/services/correo/correo.service';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {

  token: any
  usuario1 = new Usuario();
  usuario2 = new Usuario();
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute,
              private correoService: CorreoService,) {
    this.route.paramMap.subscribe(
      params => {
        this.token = params.get('token');
        console.log(this.token);
        this.correoService.decodificarMail(this.token).subscribe((resP: any) => {
          console.log(resP);
        }
        ), (err: any) => console.error(err)
      }, err => console.error(err)
    );
  }


  Reestablecer(){
    if(this.usuario1.password == this.usuario2.password){
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])[A-Za-z\d!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~]{8,}$/;
          if(!passwordRegex.test(this.usuario1.password)){
            Swal.fire({
              position: "center",
              icon: "info",
              title: "La contraseña debe tener al menos una letra, un número y un carácter especial, y debe tener al menos 8 caracteres",
              showConfirmButton: true
            })    
          }else{
            this.correoService.decodificarMail(this.token).subscribe((resToken: any) => {
              resToken.pasword = this.usuario2.password;
              
              this.usuarioService.recovery(resToken).subscribe((cambio: any) => {
                  
                this.router.navigate(['login'])
              },
                (err: any) => console.error(err)
              );
            },
              (err: any) => console.error(err)
            );
            

          }
    }else{
      Swal.fire({
        position:"center",
        icon:"error",
        title:"Las contraseñas no coinciden",
        showConfirmButton:true
      })
    }

  }
}
