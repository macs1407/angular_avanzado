import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales : Hospital[] = [];
  cargando : boolean = true;
  totalRegistros : number = 0;

  constructor(public hospitalesService : HospitalesService,
              public modalUploadService : ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(resp=>{
      this.cargarHospitales();
    });
  }

  buscarHospital(termino:string){
    if(!termino){
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalesService.buscarHospitales(termino).subscribe((hospital:Hospital[])=>{
      this.hospitales = hospital;
      this.cargando = false;
    })
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalesService.obtenerTodosLosHospitales().subscribe((resp:any)=>{
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  actualizarHospital(hospital : Hospital){
    this.hospitalesService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital : Hospital){
    Swal.fire({
      title: '¿Borrar hospital?',
      text: "Esta seguro que desea borrar el hospital, esta a punto de eliminar a "+hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminarlo!'
    }).then((result) => {
      if (result.value) {

        this.hospitalesService.eliminarHospital(hospital).subscribe(resp=>{
          this.cargarHospitales();
          Swal.fire('Borrar hospital','Se elimino el hospital', 'success');
        });
        
      }
    });
  }

  invocarModal(hospital : Hospital){
    console.log(hospital._id);
    this.modalUploadService.mostrarModal('hospitales',hospital._id);
  }

  crearHospital(){
    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },  
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar!'
    }).then(result=>{
      if(!result.value){
        return;
      }
      this.hospitalesService.guardarHospital(result.value).subscribe(resp=>{
        Swal.fire('Hospotital','Se ha creado el hospital', 'success');
        this.cargarHospitales();
      })
    });
  }
}
