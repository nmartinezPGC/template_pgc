/**
 * @author Nahum Martinez
 * @returns Modelo de Actividades con Ubicaciones
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
        public nombreNivelImpl: string,

        // Nivel de Ubicacion
        public idNivelUbicacion: number,
        public nombreNivelUbicacion: string,

        // Ubicacion de Implementacion
        public idUbicacion: number,
        public codigoUbicacionImpl: string,
        public nombreUbicacionImpl: string,

        // Ubicaciones Seleccionadas
        public idPaisUbicacion: { idPais: number },
        public idPais: number,
        public idDepartamentoUbicacion: { idDepartamento: number },
        public idDepartamento: number,
        public idMunicipioUbicacion: { idMunicipio: number },
        public idMunicipio: number,
        public idUbicacionImplementacion: { idUbicacionImplementacion: number },
        public idUbicacionImplementacionSend: number,

        // Datos de Actividad con Ubicaciones
        public idActividadUbicacion: number,
        public codigoActividad: string,
        public idActividad: { idActividad: number },
        public idActividadUbic: number,
        public porcentajeUbicacion: number,

        // Datos de Usuario
        public idUsuarioCreador: { idUsuario: number },
    ) { }
}
