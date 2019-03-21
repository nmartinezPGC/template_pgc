/**
 * @author Edgar Ramirez
 * @returns mapeo de la variables
 * @name EspacioTrabajoModel
 * @alias _EspacioTrabajoModel
 * @version 1.0.0
 * @fecha 27/02/2019
 *
 */
export class EspacioTrabajoUsuarioModel {
    constructor(
        // mapeo de la tabla tbl_espacios_trabajo
        public idEspacioTrabajoUsuario: number,
        public codEspacioTrabajoUsuario: string,

        // mapeo de la variables que estan relacionadas con la tabla
        public idEspacioTrabajo: { idEspacio: number },
        // public idEspacio: number,
        // mapeo de la variables que estan relacionadas con la tabla
        public idUsuarioEspacioTrabajo: { idUsuario: number },
        // public idUsuario: number,

        // mapeo de la variables que estan relacionadas con la tabla
        public idRolEspacioTrabajo: { idRol: number },
        public idRol: number,
        public activo: boolean = true,

        // mapeo de la variables que estan relacionadas con la tabla
    ) {
    }
}
