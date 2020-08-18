import { obtenerRobots } from "./arreglo";

xdescribe('Prueba de arreglos',()=>{
    // con la x alprincipio saltamos la prueba 
    xit('debe retornar al menos 2 robots',()=>{
        let arreglo = obtenerRobots();
        // Debe de retornar 2 o mas
        expect(arreglo.length).toBeGreaterThanOrEqual(2);
    });

    it('debe venir megaman y ultron',()=>{
        let arreglo = obtenerRobots();
        // Debe de venir megaman
        expect(arreglo).toContain('megaman');
        expect(arreglo).toContain('ultron');
    });
})