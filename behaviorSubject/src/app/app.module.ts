import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { JavascriptComponent } from './cursos/javascript/javascript.component';
import { BehaviorSubjectService } from './services/behavior-subject.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstudiantesDosComponent } from './estudiantes-dos/estudiantes-dos.component';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    EstudiantesComponent,
    JavascriptComponent,
    EstudiantesDosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [BehaviorSubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
