export default class Component{
    constructor(id, nombre){
        if(this.constructor == Component){
            throw new Error("Can't instantiate abstract class (Component)!");
        }
        this.id = id;
        this.nombre = nombre;
    }
}