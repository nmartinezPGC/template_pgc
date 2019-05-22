/**
 * @author Nahum Martinez
 * @returns Modelo de los Financiamiento Enc
 * @name ActivityFinanciamientoEncModel
 * @alias ?activityFinanciamientoEncModel
 * @version 1.0.0
 * @fecha 21-05-2019
 */
export class ActivityFinanciamientoEncModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadFinancEnc: number,
        public codigoActividadEnc: string,

        // Relacionales
        public idMonedaActividad: { idMonedaActividad: number },
        public idMoneda: number,
        public idActividad: { idActividad: number },

        // Transaccion
        public montoActividad: number,
        public fechaTransaccion: Date,

        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
