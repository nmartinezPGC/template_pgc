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
        // mapeo de relacion tipo de perfil
        public idTipoRecursos: number,
        public descripcionTipoRecurso: string,
    ) { }
}
