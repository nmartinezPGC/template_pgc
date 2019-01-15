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
        public idEstado: { idEstadoActivity: number },
        public idEstadoActivity: number,
        public idEspacioTrabajo: { idEspacioTrabajoActivity: number },
        public idEspacioTrabajoActivity: number,
        public explicacionEstado: string,
        public antecedentesActividad: string,
        public objetivoActividad: string,
        public descripcionActividad: string,
        public condicionesActividad: string,
        public codigoSiafiBip: string,

        // Planificacion
        public idEstrategia: { idEstrategiaActivity: number },
        public idEstrategiaActivity: number,
        public idPresupuesto: { idPresupuestoActivity: number },
        public idPresupuestoActivity: number,
        public idSectorEjecutor: { idSectorEjecutorActivity: number },
        public idSectorEjecutorActivity: number,

        // Resultados
        public resultadosEsperados: string,
        public resultadosAlaFecha: string,
        public justificacionActividad: string,
        public costoActividad: number,
        public idMonedaActividad: { idMonedaActividadActivity: number },
        public idMonedaActividadActivity: number = 1,

        public fechaFinanciamiento: Date,
        public nombreActividad: string,
        public productosEsperados: string,

        // Organizaciones Relaciones
        public idTipoOrganizacion: { idTipoOrganizacionActivity: number },
        public idTipoOrganizacionActivity: number,
        public idPais: { idPaisActivity: number },
        public idPaisActivity: number,
        public idOrganizacion: { idOrganizacionActivity: number },
        public idOrganizacionActivity: number,
        public idInterna: string,

        // Parte descriptiva de los llamados a las Relaciones
        // Organizaciones Descripciones
        public descPaisOrganizacion: string,
        public descTipoOrganizacion: string,
        public descOrganizacion: string,
    ) { }
}
