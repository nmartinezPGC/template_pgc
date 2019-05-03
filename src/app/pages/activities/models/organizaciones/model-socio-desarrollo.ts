/**
 * @author Nahum Martinez
 * @returns Modelo de los Socio Desarrollo
 * @name ActivityOrganizacionSocioDesarrolloModel
 * @alias _activityOrganizacionSocioDesarrolloModel
 * @version 1.0.0
 * @fecha 02-05-2019
 */
export class ActivityOrganizacionSocioDesarrolloModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadSocioDesarrollo:  number,
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
