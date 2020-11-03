import GestorMiembros from './GestorMiembros';
import GestorNodos from './GestorNodos'

export default class Movimiento{
    constructor(cedula, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas){
        this.cedula_juridica = cedula;
        this.idAsesor = idAsesor;
        this.nombre = nombre;
        this.direccionWeb = direccionWeb;
        this.logo = logo;
        this.pais = pais;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.senas = senas;
        this.gMiembros = new GestorMiembros();
        this.gNodos = new GestorNodos();
    }
}
