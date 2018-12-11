export class ActivityModel {
    // Creacion del Constructor de la Clase
    constructor(
        // Definicion de las variables Mapeadas a la Clase del Model
        public idActividad: number,

        // Datos Generales de la Actividad
        public codActividad: string,
        public idEstado: number,
        public idEspacioTrabajo: number,
        public explicacionEstado: string,
        public descripcionActividad: string,
        public antecedentesAtividad: string,
        public objetivoActividad: string,
        public condicionesActividad: string,
        public codigoSiafiBip: string,

        // Planificacion
        public idEstrategia: number,
        public idPresupuesto: number,
        public idSectorEjecutor: number,

        // Resultados
        public resultadosEsperados: string,
        public resultadosAlaFecha: string,
        public justificacionAtividad: string,
        public costoActividad: number,
        public idMonedaActividad: number,

        public fechaFinanciamiento: string,
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
