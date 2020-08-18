import { NgModule } from '@angular/core';
import { SettingsService } from './service.index';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalesService } from './hospital/hospitales.service';
import { MedicoService } from './medico/medico.service';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

/**
 * Centralizar todos los servicios para proveerlos en un solo archivo
 */

@NgModule({
  declarations: [
  ],
  imports: [   
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SharedService, 
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    ModalUploadService,
    HospitalesService,
    MedicoService,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
