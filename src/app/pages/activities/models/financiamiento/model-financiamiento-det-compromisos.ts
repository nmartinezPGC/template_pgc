/**
 * @author Nahum Martinez
 * @returns Modelo de los Financiamiento Det Compromisos
 * @name ActivityFinanciamientoDetCompromisosModel
 * @alias _activityFinanciamientoDetCompromisosModel
 * @version 1.0.0
 * @fecha 03-06-2019
 */
export class ActivityFinanciamientoDetCompromisosModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadFinancDetCompromiso: number,
        public codigoFinancCompromiso: string,

        // Relacionales
        public idTipoTransaccion: { idTipoTransaccion: number },
        public idTipoTransaccionSend: number,
        public idMonedaActividad: { idMonedaActividad: number },
        public idMonedaActividadSend: number,

        public idActividadFinancDet: { idActividadFinancDet: number },
        public idActividadFinancDetSend: number,

        // Transaccion
        public montoCompromiso: number,
        public fechaTransaccion: Date,
        public cambio_fijo: number,

        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
