/**
 * @author Nahum Martinez
 * @returns Modelo de los Campos Transversales
 * @name ActivityProgramaVidaMejorModel
 * @alias _activityProgramaVidaMejorModel
 * @version 1.0.0
 * @fecha 17-04-2019
 */
export class ActivityProgramaVidaMejorModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadProgramaVidaMejor:  number,
        public codigoActividad: string,

        // Relacionales
        public idProgramaVidaMejor: {idPrograma: number},
        public idProgramaVidaMejorSend: number,

        public idActividad: {idActividad: number},
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
