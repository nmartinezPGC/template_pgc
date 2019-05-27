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
        // datos generales
        public idEspacioTrabajo: number,
        public codEspacioTrabajo: string,
        // datos de espacios de trabajo
        public nombreEspacioTrabajo: string,
        public descripcionEspacioTrabajo: string,
        public espacioPadre: boolean = true,
        public vistaPublica: boolean = true,
        // mapeo de los datos que estan relacioneado
        public idPaisEspacio: { idPais: number },
        public idPais: number,
        public idTipoEspacioTrabajo: { idTipoEspacio: number },
        public idTipoEspacio: number,
        public idEstadoEspacioTrabajo: { idEstadoEspacio: number },
        public idEstadoEspacio: number,
        public iRolEspacio: { idRol: number },
        public idRol: number,

        // mapeo de la variables que estan relacionadas con la tabla
    ) {
    }
}
