/**
 * @author Nahum Martinez
 * @returns Modelo de los Financiamiento Det Desembolsos
 * @name ActivityFinanciamientoDetDesembolsosModel
 * @alias _activityFinanciamientoDetDesembolsosModel
 * @version 1.0.0
 * @fecha 09-07-2019
 */
export class ActivityFinanciamientoDetDesembolsosModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadFinancDetDesembolso: number,
        public codigoFinancDesembolso: string,

        // Relacionales
        public idTipoTransaccion: { idTipoTransaccion: number },
        public idTipoTransaccionSend: number,
        public idMonedaActividad: { idMonedaActividad: number },
        public idMonedaActividadSend: number,

        public idActividadFinancDet: { idActividadFinancDet: number },
        public idActividadFinancDetSend: number,

        // Transaccion
        public montoDesembolso: number,
        public fechaTransaccion: Date,
        public cambio_fijo: number,

        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
