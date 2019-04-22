/**
 * @author Nahum Martinez
 * @returns Modelo de los Campos Transversales
 * @name ActivitySectoresCampoTransversalModel
 * @alias _activitySectoresCampoTransversalModel
 * @version 1.0.0
 * @fecha 16-04-2019
 */
export class ActivitySectoresCampoTransversalModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadSectorCampo: number,
        public codigoActividad: string,

        // Relacionales
        public idSectorCampo: { idSector: number },
        public idSectorCampoSend: number,

        public idActividad: { idActividad: number },
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
