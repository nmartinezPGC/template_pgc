/**
 * @author Edgar Ramirez
 * @returns mapeo de la variables de usuario
 * @name UsuarioModel
 * @alias _perfilModel
 * @version 1.0.0
 * @fecha 16/01/2019
 * @cambio
 */
export class UsuarioModel {
    constructor(
        public idUsuario: number,
        public codUsuario: string,
        public nombre1Usuario: string,
        public nombre2Usuario: string,
        public apellido1Usuario: string,
        public apellido2Usuario: string,
        public inicialesUsuario: string,
        public emailUsuario: string,
        public passwordUsuario: string,
        public imagenUsuario: string,
        public activada: boolean,
        // public estadoUsuario: boolean = true,
        // mapeo de relacion tipo de usuario
        public idTipoUsuario: { idTipo: number },
        public idTipo: number,
        public descTipoUsuario: string,
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
