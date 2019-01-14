/**
 * @author Nahum Martinez
 * @returns Modelo de Actividades
 * @name ActivityModel
 * @alias _activityModel
 * @version 1.0.0
 * @fecha 11/01/2019
 */
export class ActivityModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        public idActividad: number,

        // Datos Generales de la Actividad
        public codigoActividad: string,
        public idEstado: number,
        public idEspacioTrabajo: number,
        public explicacionEstado: string,
        public antecedentesActividad: string,
        public objetivoActividad: string,
        public descripcionActividad: string,
        public condicionesActividad: string,
        public codigoSiafiBip: string,

        // Planificacion
        public idEstrategia: number,
        public idPresupuesto: number,
        public idSectorEjecutor: number,

        // Resultados
        public resultadosEsperados: string,
        public resultadosAlaFecha: string,
        public justificacionActividad: string,
        public costoActividad: number,
        public idMonedaActividad: number,

        public fechaFinanciamiento: Date,
        public nombreActividad: string,
        public productosEsperados: string,

        // Organizaciones Relaciones
        public idTipoOrganizacion: number,
        public idPais: number,
        public idOrganizacion: number,
        public idInterna: string,

        // Parte descriptiva de los llamados a las Relaciones
        // Organizaciones Descripciones
        public descPaisOrganizacion: string,
        public descTipoOrganizacion: string,
        public descOrganizacion: string,
    ) { }
}
