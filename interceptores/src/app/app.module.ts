import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { UsuariosService } from './services/usuarios.service';
import { InterceptorService } from './interceptors/interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UsuariosService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true // Este pendiente de todas las peticiones
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
