/**
 * @author Nahum Martinez
 * @returns Modelo de los Campos Transversales
 * @name ActivityProgramaPlanNacion
 * @alias _activityProgramaPlanNacion
 * @version 1.0.0
 * @fecha 17-04-2019
 */
export class ActivityProgramaPlanNacionModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadProgramaPlanNacion:  number,
        public codigoActividad: string,

        // Relacionales
        public idProgramaPlanNacion: {idPrograma: number},
        public idProgramaPlanNacionSend: number,

        public idActividad: {idActividad: number},
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
