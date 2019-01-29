/**
 * @author Edgar Ramirez
 * @returns mapeo de la variables de usuario
 * @name UsuarioModel
 * @alias _usuarioModel
 * @version 1.0.0
 * @fecha 16/01/2019
 * @cambio
 */
export class UsuarioModel {
    constructor(
        public activo: boolean,
        public apellido1Usuario: string,
        public apellido2Usuario: string,
        public codUsuario: string,
        public emailUsuario: string,
        public fechaCreacion: Date,
        public fechaModificacion: Date,
        public horaCreacion: Date,
        public horaModificacion: Date,
        // mapeo de la relacion del estado del usuario
        public idEstadoUsuario: { idEstado: number },
        public idEstado: number,
        public descripcionEstadoUsuario: string,
        // mapeo de la relacion del pais del usuario
        public idPaisUsuario: { idPais: number },
        public idPais: number,
        public descPais: string,
        // mapeo de relacion tipo de usuario
        public idTipoUsuario: { idTipo: number },
        public idTipo: number,
        public descTipoUsuario: string,
        //  datos generales del usuario
        public idUsuario: number,
        public imagenUsuario: string,
        public inicialesUsuario: string,
        public nombre1Usuario: string,
        public nombre2Usuario: string,
        public passwordUsuario: string,
        public idRol: number,
        // public estadoUsuario: boolean = true,



        // mapeo de la relacion del rol del usuario
        // public idRolUsuario: { idRol: number },
        // public idRol: number,
        // public descripcionRolUsuario: string,
    ) { }
}
