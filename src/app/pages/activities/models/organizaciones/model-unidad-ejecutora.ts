/**
 * @author Nahum Martinez
 * @returns Modelo de los Unidad Ejecutora
 * @name ActivityOrganizacionUnidadEjecutoraModel
 * @alias _activityOrganizacionUnidadEjecutoraModel
 * @version 1.0.0
 * @fecha 03-05-2019
 */
export class ActivityOrganizacionUnidadEjecutoraModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadUnidadEjecutora:  number,
        public codigoActividad: string,

        // Relacionales
        public idOrganizacion: { idOrganizacion: number},

        public idActividad: {idActividad: number},
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
