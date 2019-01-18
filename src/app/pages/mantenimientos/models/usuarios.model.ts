/**
 * @author Edgar Ramirez
 * @returns mapeo de la variables de usuario
 * @name UsuarioModel
 * @alias _perfilModel
 * @version 1.0.0
 * @fecha 16/01/2019
 *
 */
export class UsuarioModel {
    constructor(
        public idUsuario: number,
        public codUsuario: string,
        public nom1Usuario: string,
        public nom2Usuario: string,
        public ape1Usuario: string,
        public ape2Usuario: string,
        public inicialesUsuario: string,
        public emailUsuario: string,
        public passUsuario: string,
        public estadoUsuario: boolean = true,
        // mapeo de relacion tipo de usuario
        public idTipoUsuario: { idTipo: number },
        public idTipo: number,
        public descripcionTipoUsuario: string,
        // mapeo de la relacion del pais del usuario
        public idPaisUsuario: { idPais: number },
        public idPais: number,
        public descripcionPaisUsuario: string,
        // mapeo de la relacion del estado del usuario
        public idEstadoUsuario: { idEstado: number },
        public idEstado: number,
        public descripcionEstadoUsuario: string,
        // mapeo de la relacion del rol del usuario
        public idRolUsuario: { idRol: number },
        public idRol: number,
        public descripcionRolUsuario: string,
    ) { }
}
