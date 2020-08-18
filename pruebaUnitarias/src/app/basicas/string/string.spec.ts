import { mensaje } from "./string";

describe('prueba de string',()=>{
    it('retorna una string',()=>{
        let nombre = mensaje('maikol');
        expect(typeof nombre).toBe('string');
    });

    it('verifica que contenga una palabra',()=>{
        let nombre = 'maikol';
        let msj = mensaje(nombre);
        expect(msj).toContain(nombre);
    });
});