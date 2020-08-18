import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty'
import 'rxjs/add/observable/throw';

describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const servicio = new MedicosService(null);

    beforeEach( () => {
        componente = new MedicosComponent(servicio);
    });


    it('init debe de cargar los medicos', () => {
        const arregloMedicos = ['maikol','matias','kerly'];
        // Espiar al servicio 'medicos service' y cuando alguien llame al metodo
        // getMedicos, se va a llamar y ejecutar la funcion que se define
        spyOn(servicio, 'getMedicos').and.callFake(()=>{
            // getMedicos retorna un observable de medicos, entonces toca retornar un 
            // observale
            return Observable.from([arregloMedicos]);
        });

        componente.ngOnInit();
        let medicos: any[] = componente.medicos;
        // Debe de devolver medicos
        expect(medicos.length).toBeGreaterThan(0);   
    });

    it('Debe de llamar al servidor para agregar un medico', () => {
        // Espiar al servicio 'medicos service' y cuando alguien llame al metodo
        // agregarMedico, se va a llamar y ejecutar la funcion que se define
        const espia = spyOn(servicio, 'agregarMedico').and.callFake(medico=>{
            // se valida que se llamo al metodo
            return Observable.empty();
        });

        componente.agregarMedico();

        // Comprueba si el espia llamo al metodo
        expect(espia).toHaveBeenCalled();  
    });

    it('Debe agregar un medico al arreglo de medicos', () => {
        const addMedico = {id:2,nombre:'maikol'};
        // Espiar al servicio 'medicos service' y cuando alguien llame al metodo
        // agregarMedico, se va a llamar y ejecutar la funcion que se define
        spyOn(servicio, 'agregarMedico').and.returnValue(
            Observable.from([addMedico])
        );

        componente.agregarMedico();

        // Comprueba si el espia llamo al metodo
        expect(componente.medicos.indexOf(addMedico)).toBeGreaterThanOrEqual(0);  
    });

    it('si falla la adicion la propiedad mensaje error, debe ser igual al error del servicio',()=>{
        const miError = 'No se pudo agregar medico';
        spyOn(servicio, 'agregarMedico').and.returnValue(
            Observable.throw(miError)
        );

        componente.agregarMedico();

        expect(componente.mensajeError).toBe(miError);
    });

    it('debe de llama al servidor para borrar un medico',()=>{
        spyOn(window,'confirm').and.returnValue(true);

        const espia = spyOn(servicio,'borrarMedico').and.returnValue(
            Observable.empty()
        );

        componente.borrarMedico('1');

        expect(espia).toHaveBeenCalledWith('1');
    });

});
