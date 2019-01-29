/**
 * @author Nahum Martinez
 * @returns Modelo de Actividades
 * @name ActivityPlanificacionModel
 * @alias _activityPlanificacionModel
 * @version 1.0.0
 * @fecha 28/01/2019
 */
export class ActivityPlanificacionModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        public idActividad: number,
        public codigoActividad: string,

        // Fechas de Planificacion
        public fechaFirma: Date,
        public fechaEfectividad: Date,
        public fechaCierre: Date,
        public fechaPropuestaFinalizacion: Date,
        public fechaFinalizacion: Date,

        // Auditoria
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
