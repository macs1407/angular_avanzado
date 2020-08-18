import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalesService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales:Hospital[] = [];
  medico : Medico = new Medico('','','','','');
  hospital : Hospital = new Hospital('');

  constructor(public medicoService : MedicoService,
              public hospitalesService : HospitalesService,
              public router : Router,
              public activatedRoute : ActivatedRoute,
              public modalUploadService : ModalUploadService) {
    this.activatedRoute.params.subscribe(params=>{
      let nuevoMedico = new Medico
      let id = params['id'];
      if(id != 'nuevo'){
        this.cargarMedico(id);
      }      
    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(resp=>{
      this.medico.img = resp.medicoActualizado.img;
    });
  }

  cargarHospitales(){
    this.hospitalesService.obtenerTodosLosHospitales().subscribe((hospitales:any)=>{
      console.log('resp',hospitales.hospitales);
      this.hospitales = hospitales.hospitales;
      console.log('hospital',this.hospitales);
    });
  }

  guardarMedico(f:NgForm){
    if(!f.valid){
      return;
    }
    if(this.medico._id){
      this.medicoService.actualizarMedico(this.medico).subscribe((resp:any)=>{
        this.medico = resp.medico;
        Swal.fire('Medico actualizado','Se creo el medico '+this.medico.nombre, 'success');
        this.router.navigate(['/medico',this.medico._id]);
      });
    } else {
      this.medico.nombre = f.value.nombre;
      this.medico.hospital = f.value.hospital;
      this.medicoService.guardarMedico(this.medico).subscribe((resp:any)=>{
        this.medico = resp.medico;
        Swal.fire('Medico creado','Se creo el medico '+this.medico.nombre, 'success');
        this.router.navigate(['/medico',this.medico._id]);
      });
    }
  }

  cambioHospital(event){
    if(!event || event === ''){
      this.hospital = new Hospital('');
      return;
    }
    let id = event;
    this.hospitalesService.obtenerHospitalPorId(id).subscribe(resp=>{
      this.hospital = resp;
      console.log('h',this.hospital);
    });
  }

  cargarMedico(id:number){
    this.medicoService.obtenerMedico(id).subscribe((resp:any)=>{
      this.medico = resp.medico;
      this.medico.hospital = resp.medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  invocarModal(medico : Medico){
    this.modalUploadService.mostrarModal('medicos',medico._id);
  }
}
