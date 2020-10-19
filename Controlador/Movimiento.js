import GestorMiembros from './GestorMiembros';

class Movimiento{
    constructor(cedula, id_asesor, nombre, direccion_web, logo, pais, provincia, canton, distrito, señas){
        this.cedula_juridica = cedula;
        this.id_asesor = id_asesor;
        this.nombre = nombre;
        this.direccion_web = direccion_web;
        this.logo = logo;
        this.pais = pais;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.señas = señas;
        this.gMiembros = new GestorMiembros();
    }
}