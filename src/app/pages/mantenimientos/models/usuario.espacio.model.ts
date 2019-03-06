/**
 * @author Edgar Ramirez
 * @returns mapeo de la variables
 * @name EspacioTrabajoModel
 * @alias _EspacioTrabajoModel
 * @version 1.0.0
 * @fecha 27/02/2019
 *
 */
export class EspacioTrabajoModel {
    constructor(
        // mapeo de la tabla tbl_espacios_trabajo
        public idEspacioTrabajo: number,
        public codEspacioTrabajo: string,
        public nombreEspacioTrabajo: string,
        public descripcionEspacioTrabajo: string,
        public espacioPadre: boolean = true,
        public vistaPublica: boolean = true,
        // mapeo de la variables que estan relacionadas con la tabla
        public idPaisEspacio: { idPais: number },
        public idPais: number,
        // mapeo de la variables que estan relacionadas con la tabla
        public idTipoEspacioTrabajo: { idTipoEspacio: number },
        public idTipoEspacio: number,

        // mapeo de la variables que estan relacionadas con la tabla
        public idEstadoEspacioTrabajo: { idEstadoEspacio: number },
        public idEstadoEspacio: number,

        // mapeo de la variables que estan relacionadas con la tabla
    ) {
    }
}
