import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path:'', 
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    // Hace que se carguen las paginas una a una y no todas al mismo tiempo
    loadChildren: './pages/pages.module#PagesModule' 
  },
  { path: '**', component: NopagefoundComponent }
];

//export class AppRoutingModule { }
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
