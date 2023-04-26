import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { LogupComponent } from './components/logup/logup.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ObjetivosComponent } from './components/objetivos/objetivos.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { DelUsuarioComponent } from './components/del-usuario/del-usuario.component';
import { ModUsuarioComponent } from './components/mod-usuario/mod-usuario.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [{
  path: "",
  redirectTo: "/login",
  pathMatch: "full"
  },
  {
  path: 'login',
  component: LoginComponent,
  },
  {
  path: 'cal',
  component: CalendarComponent,
  },

  {
    path: 'menu',
    component: MenuComponent,
},
{
  path: 'recuperar/:token',
  component: RecoveryComponent,
},
{
  path: 'logup',
  component: LogupComponent,
},
{
  path: 'tareas',
  component: TareasComponent,
},
{
  path: 'objetivos',
  component: ObjetivosComponent,
},
{
  path: 'notes',
  component: CalendarioComponent,
},
{
  path: 'delcuenta',
  component: DelUsuarioComponent,
},
{
  path: 'modcuenta',
  component: ModUsuarioComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
