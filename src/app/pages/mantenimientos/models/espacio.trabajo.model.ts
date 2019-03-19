/**
 * @author David Pavon
 * @returns mapeo de la variables
 * @name espacioTrbajoModel
 * @alias _espacioTrbajoModel
 * @version 1.0.0
 * @fecha 23/01/2019
 *
 */
export class EspacioTrabajoModel {
    constructor(
        // mapeo de la tabla  tbl_tipo_organizacion
        public idEspacioTrabajo: number,
        public codEspacioTrabajo: string,
        public nombreEspacioTrabajo: string,
        public descripcionEspacioTrabajo: String,
        public fechaCreacion: string,
        public horaCreacion: Date,
        public idCatOrganizacion: number,

        // mapeo de la variables que estan relacionadas con la tabla
        public idTipoEspacioTrabajo: { idTipoEspacioTrabajo: number },
        public idTipoEspacioTrabajo1: number,

        // mapeo de la tabla que estab relaciones con pais
        public idPaisEspacioTrabajo: {idpais: number},
        public idPais: number,

        //  mapeo de la variables que esta relacionada con la tabla
        public idEstadoEspacioTrabajo: {idEstado: number},
        public idEstado1: number,
    ) { }
}
