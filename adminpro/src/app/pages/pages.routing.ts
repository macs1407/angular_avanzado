import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProlfileComponent } from './prolfile/prolfile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// LazyLoad 
const pagesRoute : Routes = [
 
        { path: 'dashboard'
          ,component: DashboardComponent
          ,data: {titulo: 'Dasboard'}
          ,canActivate: [VerificaTokenGuard] // Verificar que el token sea valido o lo renueva
        },
        { path: 'progress'
          ,component: ProgressComponent
          ,data: {titulo: 'Progress'}
        },
        { path: 'graficas1'
          ,component: Graficas1Component
          ,data: {titulo: 'Graficas'}
        },
        { path: 'accounts-settings'
          ,component: AccountSettingsComponent
          ,data: {titulo: 'Ajustes'}
          ,canActivate: [VerificaTokenGuard]
        },
        { path: 'perfil'
          ,component: ProlfileComponent
          ,data: {titulo: 'Perfil de usuario'}
          ,canActivate: [VerificaTokenGuard]
        },
        { path: 'promesas'
          ,component: PromesasComponent
          ,data: {titulo: 'Promesas'}
        },
        { path: 'rxjs'
          ,component: RxjsComponent
          ,data: {titulo: 'Rxjs'}
        },
        { path: 'busqueda/:termino'
          ,component: BusquedaComponent
          , data: {titulo: 'Buscador'}
          ,canActivate: [VerificaTokenGuard]
        },
        // Mantenimiento
        { path: 'usuarios'
          ,component: UsuariosComponent
          ,data: {titulo: 'Mantemiento de usuarios'}
          ,canActivate:[AdminGuard,VerificaTokenGuard] // Solo se permite rol administrador
        },
        { path: 'hospitales'
          ,component: HospitalesComponent
          ,data: {titulo: 'Mantemiento de hospitales'}
          ,canActivate: [VerificaTokenGuard]
        },
        { path: 'medicos'
          ,component: MedicosComponent
          ,data: {titulo: 'Mantemiento de medicos'}
          ,canActivate: [VerificaTokenGuard]
        },
        { path: 'medico/:id'
          ,component: MedicoComponent
          ,data: {titulo: 'Actualizar medico'}
          ,canActivate: [VerificaTokenGuard]
        },
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    
];

/** Anterior
const pagesRoute : Routes = [
    {
        path: '', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children:[
          {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dasboard'}},
          {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
          {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
          {path: 'accounts-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
          {path: 'perfil', component: ProlfileComponent, data: {titulo: 'Perfil de usuario'}},
          {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
          {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
          // Mantenimiento
          { path: 'usuarios'
            ,component: UsuariosComponent
            ,data: {titulo: 'Mantemiento de usuarios'}
            ,canActivate:[AdminGuard]
          },
          {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantemiento de hospitales'}},
          {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantemiento de medicos'}},
          {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar medico'}},
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
      }
];*/

export const APP_ROUTES_PAGES = RouterModule.forChild(pagesRoute)