/**
 * @author Edgar Ramirez
 * @returns Modelo de los Sectores OCDE/CAD
 * @name ActivitySectoresOcdeModel
 * @alias _activitySectoresOcdeModel
 * @version 1.0.0
 * @fecha 12/04/2019
 */
export class ActivitySectoresOcdeModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Generales de tabla
        public idActividadSectorOcde: number,
        public codigoActividad: string,

        // Relacionales
        public idSectorOcde: { idSector: number },
        public idSectorOcdeSend: number,

        public idActividad: { idActividad: number },
        public idActividadSend: number,
        public porcentajePart: number,
        // Auditoria
        public activo: boolean,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}
