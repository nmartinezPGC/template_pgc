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
        public emailUsuario2: string,
        public direccion: string,
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
        // mapeo de relacion tipo de organizacion de el usuario
        public idTipoOrganizacionUsuario: { idTipoOrganizacion: number },
        public idTipoOrganizacion: number,
        public descTipoOrganizacion: string,
        // mapeo de relacion categoria de organizacion de usuario
        public idCatOrganizacionUsuario: { idCatOrganizacion: number },
        public idCatOrganizacion: number,
        public descCatOrganizacion: string,
        // mapeo de relacion tipo de usuario
        public idOrganizacionUsuario: { idOrganizacion: number },
        public idOrganizacion: number,
        public descOrganizacion: string,
        //  datos generales del usuario
        public idUsuario: number,
        public imagenUsuario: string,
        public inicialesUsuario: string,
        public nombre1Usuario: string,
        public nombre2Usuario: string,
        public passwordUsuario: string,
        public passwordUsuario2: string,
        public rol: number,
    ) { }
}
