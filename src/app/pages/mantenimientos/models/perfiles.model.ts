/**
 * @author David Pavon
 * @returns mapeo de la variables de perfiles
 * @name PerfilModel
 * @alias _perfilModel
 * @version 1.0.0
 *
 */
export class PerfilModel {
    constructor(
        public idPerfil: number,
        public codPerfil: string,
        public descripcionPerfil: string,
        public estadoPerfil: boolean,
        
        // mapeo de relacion tipo de perfil
        public idTipoPerfil: number,
        public descripcionTipoPerfil: string,
    ) { }
}