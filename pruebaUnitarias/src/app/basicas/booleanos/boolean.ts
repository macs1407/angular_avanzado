export function usuarioLogeado(nombre:string){
    if(nombre == '' || nombre == undefined){
        return false;
    } else {
        return true;
    }    
}