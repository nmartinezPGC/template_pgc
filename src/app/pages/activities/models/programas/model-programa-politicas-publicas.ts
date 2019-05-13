/**
 * @author Allan Madrid
 * @returns Modelo de Actividades
 * @name ActivityPoliticasPublicas
 * @alias _activityPoliticasPublicas
 * @version 1.0.0
 * @fecha 10/04/2019
 */
export class ActivityPoliticasPublicasModel {
    // Creacion del Constructor de la Clase
    constructor(
         // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadProgramaPoliticasPublicas:  number,
        public codigoActividad: string,

        // Relacionales
        public idProgramaPoliticasPublicas: {idPrograma: number},
        public idProgramaPoliticasPublicasSend: number,

        public idActividad: {idActividad: number},
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
