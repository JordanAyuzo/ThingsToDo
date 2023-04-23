import { Component } from '@angular/core';
import { Usuario } from "../../models/usuario";
@Component({
  selector: 'app-mod-usuario',
  templateUrl: './mod-usuario.component.html',
  styleUrls: ['./mod-usuario.component.css']
})
export class ModUsuarioComponent {
  usuario= new Usuario
  modificarUsuario(){
    
  }
}
