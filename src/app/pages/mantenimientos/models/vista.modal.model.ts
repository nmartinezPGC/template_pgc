/**
 * @author Allan Madrid
 * @returns mapeo de la variables
 * @name VistaModalModel
 * @alias _VistaModalModel
 * @version 1.0.0
 * @fecha 17/06/2019
 *
 */
export class VistaModalModel {
    constructor(
        // mapeo de la tabla tbl_espacios_trabajo
        public idEspaciosTrabajoUsuarios: number,
        public codEspacioTrabajoUsuario: string,

        // mapeo de la variables que estan relacionadas con la tabla
        public idEspacioTrabajo: { idEspacioTrabajo: string },
         public idEspacio: number,
        // mapeo de la variables que estan relacionadas con la tabla
        public idUsuarioEspacioTrabajo: { idUsuario: number },
         public idUsuario: number,

        // mapeo de la variables que estan relacionadas con la tabla
        public idRolEspacioTrabajo: { idRol: number },
        public idRol: number,
        public activo: boolean = true,

        // mapeo de la variables que estan relacionadas con la tabla
    ) {
    }
}
