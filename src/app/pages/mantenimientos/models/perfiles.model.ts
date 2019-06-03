/**
 * @author David Pavon
 * @returns mapeo de la variables de perfiles
 * @name PerfilModel
 * @alias _perfilModel
 * @version 1.0.0
 * @fecha 28/12/2018
 *
 */
export class PerfilModel {
    constructor(
        public idPerfil: number,
        public codPerfil: string,
        public descPerfil: string,
        public activado: boolean = true,
        // mapeo de relacion tipo de perfil
        public idTipoPerfil: { idTipo: number },
        public idTipo: number,
        public descripcionTipoPerfil: string,
    ) { }
}
