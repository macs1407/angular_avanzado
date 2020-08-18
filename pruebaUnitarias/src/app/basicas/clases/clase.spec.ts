import { Jugador } from "./clase"

describe('Pruebas de clase',()=>{
    let jugador = new Jugador();
    /**
     * Solo se dispara una vez
     */
    beforeAll(()=>{
        console.log('beforeAll');
    });

    /**
     * Luego se dispara beforeEach por que se esta empezando la primera prueba
     * Debe de retornar 80 de hp, si recibe 80 de daño
     */
    beforeEach(()=>{
        console.log('beforeEach');
    });

    /**
     * Se dispara cuando se hacen todas las pruebas
     */
    afterAll(()=>{
        console.log('afterAll');
    });

    /**
     * Antes de cada prueba IT inicializa de nuevo el objeto
     */
    afterEach(()=>{
        jugador = new Jugador();
    });

    it('Debe de retornar 80 de hp, si recibe 80 de daño',()=>{
        let hp = jugador.recibeDano(20);
        expect(hp).toBe(80);
    });

    it('Debe de retornar 50 de hp, si recibe 50 de daño',()=>{
        let hp = jugador.recibeDano(50);
        expect(hp).toBe(50);
    });

    it('Debe de retornar 0 de hp, si recibe 100 de daño',()=>{
        let hp = jugador.recibeDano(100);
        expect(hp).toBe(0);
    });
})