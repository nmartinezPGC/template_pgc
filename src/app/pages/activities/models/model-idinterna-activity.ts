/**
 * @author Nahum Martinez
 * @returns Modelo de Actividades
 * @name ActivityIdInternaModel
 * @alias _activityIdInternaModel
 * @version 1.0.0
 * @fecha 11/02/2019
 */
export class ActivityIdInternaModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        public idInterna: number,
        public idOrganizacionIdInterna: { idOrganizacion: number},
        public idOrganizacion: number,
        public idActividadIdInterna: { idActividad: number },
        public idActividad: number,
        public codIdInterna: string,

        // Auditoria
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
