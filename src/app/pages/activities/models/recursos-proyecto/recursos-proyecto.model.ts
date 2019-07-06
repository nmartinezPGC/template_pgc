/**
 * @author Allan Madrid
 * @returns mapeo de la variables de documentos y links
 * @name PerfilModel
 * @alias _perfilModel
 * @version 1.0.0
 * @fecha 11/06/2019
 *
 */
export class RecursosProyectoModel {
    constructor(
        public idActividadRecurso: number,
        public codigoActividadRecurso: string,
        public descripcion: string,
        public titulo: string,
        public nota: string,
        public urlActividadRecursoLink: string,
        public urlActividadRecursoDocumento: string,

        // mapeo de relación con actividades
        public idActividad: { idActividad: number },
         public Actividad: number,
         // mapeo de Tipo Recursos
         public idTipoRecursos: {idTipoRecursos: number},
         public TipoRecursos: number,
        // mapeo de relación con Usuarios
        public idUsuario: { idUsuario: number },
        public Usuario: number,
        // mapeo de Tipos de la tabla Tipos
        public idTipo: {idTipo: number},
        public Tipo: number,
        // mapeo de relacion tipo de perfil
         public activo: boolean = true,
    ) { }
}
