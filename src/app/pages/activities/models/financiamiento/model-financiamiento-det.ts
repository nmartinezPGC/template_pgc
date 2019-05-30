/**
 * @author Nahum Martinez
 * @returns Modelo de los Financiamiento Det
 * @name ActivityFinanciamientoDetModel
 * @alias _activityFinanciamientoDetModel
 * @version 1.0.0
 * @fecha 29-05-2019
 */
export class ActivityFinanciamientoDetModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadFinancDet: number,
        public codigoFinancDet: string,

        // Relacionales
        public idTipoFinanciamiento: { idTipoFinanciamiento: number },
        public idTipoFinanciamientoSend: number,
        public idModalidadAyuda: { idModalidadAyuda: number },
        public idModalidadAyudaSend: number,
        public idSocioDesarrollo: { idSocioDesarrollo: number },
        public idSocioDesarrolloSend: number,

        public idActividadFinancEnc: { idActividadFinancEnc: number },

        // Transaccion
        public idOrganizacionFinanciera: string,

        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
