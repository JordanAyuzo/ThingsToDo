import { Component} from '@angular/core';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { Tareas } from 'src/app/models/tareas';
declare var $ : any;
declare var  M :any

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, Option);
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{
  constructor() { }
  ngOnInit()
  {
    console.log("Iniciando");

    $(document).ready(function ()
    {
      $(".modal").modal();

    })  
  }
 
  openModal(){
    $('#modal1').modal();
      $('#modal1').modal("open");
  }
}
