import { usuarioLogeado } from "./boolean"

describe('prueba de booleanos',()=>{
    it('debe de retornar true',()=>{
        let res = usuarioLogeado('maikol cucunuba');
        expect(res).toBeTruthy();
    });

    it('no debe de retornar true',()=>{
        let res = usuarioLogeado('');
        expect(res).not.toBeTruthy();
    })
})