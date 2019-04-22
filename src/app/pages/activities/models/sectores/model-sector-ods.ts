/**
 * @author Nahum Martinez
 * @returns Modelo de los Sectores ODS
 * @name ActivitySectoresOdsModel
 * @alias _activitySectoresOdsModel
 * @version 1.0.0
 * @fecha 19-04-2019
 */
export class ActivitySectoresOdsModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadSectorOds: number,
        public codigoActividad: string,

        // Relacionales
        public idSectorOds: { idSector: number },
        public idSectorOdsSend: number,

        public idActividad: { idActividad: number },
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
