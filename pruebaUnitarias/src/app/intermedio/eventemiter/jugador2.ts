import { EventEmitter } from "@angular/core";

export class Jugador2{
    hp:number;
    hpCambia = new EventEmitter<number>();
    constructor(){
        this.hp = 100;
    }

    recibeDano(dano:number){
        if(dano>=this.hp){
            this.hp = 0;
        } else {
            this.hp = this.hp - dano;
        }
        this.hpCambia.emit(this.hp);
    }
}