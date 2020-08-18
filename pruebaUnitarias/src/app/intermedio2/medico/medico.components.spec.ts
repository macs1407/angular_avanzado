import { MedicoComponent } from "./medico.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MedicoService } from "./medico.service";

describe('medico component',()=>{
    let component: MedicoComponent;
    // Acceder al html del componente y el dom
    let fixture:ComponentFixture<MedicoComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[MedicoComponent],
            imports:[HttpClientModule],
            providers: [MedicoService]
        });

        fixture = TestBed.createComponent(MedicoComponent);
        // Se obtiene la instancia del componente
        component = fixture.componentInstance;
    });

    it('Debe de crearse el componente',()=>{
        // Comprobar que el componente se haya creado correctamente
        expect(component).toBeTruthy();
    });

    it('Debe de retornar el nombre del medico',()=>{
        const nombre = 'maikol';
        const mensaje = component.saludarMedico(nombre);
        
        expect(mensaje).toContain(nombre);
    });
});