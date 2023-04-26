import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { LogupComponent } from './components/logup/logup.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { ObjetivosComponent } from './components/objetivos/objetivos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DelUsuarioComponent } from './components/del-usuario/del-usuario.component';
import { ModUsuarioComponent } from './components/mod-usuario/mod-usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    LogupComponent,
    RecoveryComponent,
    TareasComponent,
    ObjetivosComponent,
    CalendarioComponent,
    DelUsuarioComponent,
    ModUsuarioComponent,
    NavbarComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
