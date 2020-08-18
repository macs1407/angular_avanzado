import { incrementar } from "./numeros";

describe('prueba de numeros',()=>{
    it('debe de retornar 100 si el numero ingresado es mayo a 100',()=>{
        let resp = incrementar(300);
        expect(resp).toBe(100);
    });

    it('debe de retornar el numero ingresado + 1, si el numero ingresado es menor a 100',()=>{
        let resp = incrementar(70);
        expect(resp).toBe(71);
    });
})