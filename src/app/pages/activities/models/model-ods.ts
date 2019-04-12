/**
 * @author Edgar Ramirez
 * @returns Modelo de los ODS
 * @name ActivityOdsModel
 * @alias _activityOdsModel
 * @version 1.0.0
 * @fecha 12/04/2019
 */
export class ActivityOdsModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Nivel de Implementacion
        public idSector:  number,
        public codSector: string,

        public idTipoSector: {idTipo: number},
        public idTipo: number,
        public sectorPadreId: {idSector: number},
        public idSectorPadre: number,
        public nombreSector: string,
        public descripcionSector: string,

        public activo: boolean,
        public fechaCreacion: Date,
        public idNivelSector: { idNivel: number },
        public idNivel: number,

    ) { }
}
