import { Formulario } from "./formulario";
import { FormBuilder } from "@angular/forms";

describe('pruebas para formulario',()=>{
    let formulario : Formulario;

    beforeAll(()=>{
        formulario = new Formulario(new FormBuilder())
    });
    
    it('Debe de crear un formulario con 2 campos',()=>{
        // Deben de existir estos 2 campos
        expect(formulario.form.contains('email')).toBeTruthy();
        expect(formulario.form.contains('password')).toBeTruthy();
    });

    it('El email debe debe ser obligatorio',()=>{
        // Se obtiene la refencia al campo email con su metodos y demas
        const control = formulario.form.get('email');
        control.setValue('');
        // El campo obligatorio es invalido por lo cual la condicion se cumple
        expect(control.valid).toBeFalsy();
    });

    it('El email debe debe ser valido',()=>{
        // Se obtiene la refencia al campo email con su metodos y demas
        const control = formulario.form.get('email');
        control.setValue('maikol@gmail.com');
        // pasa por que es un correo invalido
        expect(control.valid).toBeTruthy();
    });
});