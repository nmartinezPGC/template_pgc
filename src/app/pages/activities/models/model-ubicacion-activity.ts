/**
 * @author Nahum Martinez
 * @returns Modelo de Actividades
 * @name ActivityUbicacionModel
 * @alias _activityUbicacionModel
 * @version 1.0.0
 * @fecha 29/02/2019
 */
export class ActivityUbicacionModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        // Nivel de Implementacion
        public idNivel:  number,
        public codigoNivelImpl: string,

        // Nivel de Ubicacion
        public idNivelUbicacion: number,
        public codigoNivelUbicacionImpl: string,
    ) { }
}
