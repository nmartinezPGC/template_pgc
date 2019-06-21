/**
 * @author David Pavon
 * @returns mapeo de la variables
 * @name espacioTrbajoModel
 * @alias _espacioTrbajoModel
 * @version 1.0.0
 * @fecha 23/01/2019
 *
 */
export class EspaciosTrabajoModel {


    constructor(
        // mapeo de la tabla  tbl_tipo_organizacion
        // datos generales
        public activo: boolean = true,
        public idEspacioTrabajo: number,
        public codEspacioTrabajo: string,
        // datos de la tabala de espacios trabajo
        public nombreEspacioTrabajo: string,
        public descripcionEspacioTrabajo: String,
        public fechaCreacion: Date,
        public horaCreacion: Date,
        public vistaPublica: boolean = true,
        public espacioPadre: boolean = true,
        // datos relacionados con la tabla
        public idTipoEspacioTrabajo: { idTipo: number },
        public idTipoIN: number,
        public idPais: { idPais: number },
        public idPaisIN: number,
        public descPais: string,
        public idEstadoEspacioTrabajo: {idEstado: number},
        public idEstadoIN: number,

    ) { }
}
