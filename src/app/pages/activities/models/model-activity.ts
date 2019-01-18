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
        public idEstadoActivity: { idEstado: number },
        public idEstado: number,
        public idEspacioTrabajoActivity: { idEspacioTrabajo: number },
        public idEspacioTrabajo: number,
        public explicacionEstado: string,
        public antecedentesActividad: string,
        public objetivoActividad: string,
        public descripcionActividad: string,
        public condicionesActividad: string,
        public codigoSIAFIBIP: string,

        // Planificacion
        public idEstrategiaActivity: { idEstrategia: number },
        public idEstrategia: number,
        public idPresupuestoActivity: { idPresupuesto: number },
        public idPresupuesto: number,
        public idSectorEjecutorActivity: { idSectorEjecutor: number },
        public idSectorEjecutor: number,

        // Resultados
        public resultadosEsperados: string,
        public resultadosAlaFecha: string,
        public justificacionActividad: string,
        public costoActividad: number,
        public idMonedaActividadActivity: { idMonedaActividad: number },
        public idMonedaActividad: number,

        public fechaFinanciamiento: Date,
        public nombreActividad: string,
        public productosEsperados: string,

        // Organizaciones Relaciones
        public idTipoOrganizacionActivity: { idTipoOrganizacion: number },
        public idTipoOrganizacion: number,
        public idPaisActivity: { idPais: number },
        public idPais: number,
        public idOrganizacionActivity: { idOrganizacion: number },
        public idOrganizacion: number,
        public idInterna: string,

        // Parte descriptiva de los llamados a las Relaciones
        // Organizaciones Descripciones
        public descPaisOrganizacion: string,
        public descTipoOrganizacion: string,
        public descOrganizacion: string,

        // Campos de Auditoria
        public idUsuarioCreador: { idUsuario: number },
        public idUsuario: number,

        // Fechas de Planificacion
        public fechaFirma: Date,
        public fechaEfectividad: Date,
        public fechaCierre: Date,
        public fechaPropuestaFinalizacion: Date,
        public fechaFinalizacion: Date,
    ) { }
}
