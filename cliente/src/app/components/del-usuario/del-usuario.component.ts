import { Component } from '@angular/core';
import { Usuario } from "../../models/usuario";
@Component({
  selector: 'app-del-usuario',
  templateUrl: './del-usuario.component.html',
  styleUrls: ['./del-usuario.component.css']
})
export class DelUsuarioComponent {
  usuario = new Usuario();
  borrarUsuario(){
    
  }
}
