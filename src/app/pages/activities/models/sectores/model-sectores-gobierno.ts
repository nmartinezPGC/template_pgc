/**
 * @author Nahum Martinez
 * @returns Modelo de los ODS
 * @name ActivitySectoresGobiernoModel
 * @alias _activitySectoresGobiernoModel
 * @version 1.0.0
 * @fecha 12/04/2019
 */
export class ActivitySectoresGobiernoModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadSectorGob: number,
        public codigoActividad: string,

        // Relacionales
        public idSectorGobierno: { idSector: number },
        public idSectorGobiernoSend: number,

        public idActividad: { idActividad: number },
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
