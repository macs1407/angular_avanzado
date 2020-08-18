import { Jugador2 } from "./jugador2";

describe('Jugador2 emit',()=>{
    let jugador : Jugador2;
    /**
     * Solo se dispara una vez
     */
    beforeAll(()=>{
        console.log('beforeAll');
    });

    beforeEach(()=>{
        jugador = new Jugador2();
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
    });

    it('Debe de emitir un evento cuando recibe daño',()=>{
        let nuevoHp = 0;
        jugador.hpCambia.subscribe(hp=>{
            nuevoHp = hp;
        });
        jugador.recibeDano(1000);
        expect(nuevoHp).toBe(0);
    });

    it('Debe de emitir un evento cuando recibe daño y sobrevivir si es menor de 100',()=>{
        let nuevoHp = 0;
        jugador.hpCambia.subscribe(hp=>{
            nuevoHp = hp;
        });
        jugador.recibeDano(50);
        expect(nuevoHp).toBe(50);
    });
})