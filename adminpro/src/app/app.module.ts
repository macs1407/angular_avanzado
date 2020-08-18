import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// Router
import { APP_ROUTES } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/services.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ // TODOS LOS COMPONENTES VAN EN DECLARATION
    AppComponent,
    LoginComponent,
    RegisterComponent, 
    PagesComponent // Componente principal para LazyLoad
  ],
  imports: [ // TODOS LOS MODULOS VAN EN LOS IMPORT
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,
    SharedModule, // Es necesario para PagesComponent
  ],
  providers: [], // TODOS LOS SERVICIOS VAN EN LOS PROVIDERS
  bootstrap: [AppComponent]
})
export class AppModule { }
