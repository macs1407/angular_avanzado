import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos : Medico[] = [];
  totalRegistros:number = 0;

  constructor(public medicosService : MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.medicosService.obtenerTodosLosMedicos().subscribe((resp:any)=>{
      console.log('datos', resp);
      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
    });
  }

  buscarMedico(termino:string){
    if(!termino){
      this.cargarMedicos();
      return;
    }
    this.medicosService.buscarMedicos(termino).subscribe((medicos:Medico[])=>{
      this.medicos = medicos;
    })
  }

  borrarMedico(medico:Medico){
    console.log('medico',medico);
    Swal.fire({
      title: '¿Borrar medico?',
      text: "Esta seguro que desea borrar el medico, esta a punto de eliminar a "+medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminarlo!'
    }).then((result) => {
      if (result.value) {

        this.medicosService.eliminarMedico(medico).subscribe(resp=>{
          this.cargarMedicos();
          Swal.fire('Borrar medico','Se elimino el medico', 'success');
        });
        
      }
    });
  }
}
