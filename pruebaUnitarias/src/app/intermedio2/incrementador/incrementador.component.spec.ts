import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('Incremendator Component', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ IncrementadorComponent ],
            imports: [ FormsModule ]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;

    });

    it('Mostrar el titulo del componente', () => {
        component.leyenda = 'Progreso de carga';
        fixture.detectChanges();
        const element: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
        expect(element.innerHTML).toContain('Progreso de carga');
    });

    it('Debe de mostrar en el input el valor del progreso',()=>{
        component.cambiarValor(5);
        fixture.detectChanges();
        const input : HTMLElement = fixture.debugElement.query(By.css('.input')).nativeElement;
        expect(input.value).toBe('55');
    })

});
