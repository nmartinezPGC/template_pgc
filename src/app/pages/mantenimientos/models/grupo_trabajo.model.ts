/**
 * @author David Pavon
 * @returns mapeo de la variables
 * @name GrupoTrabajoModel
 * @alias _GrupoTrabajoModelodel
 * @version 1.0.0
 * @fecha 18/01/2019
 *
 */
export class GrupoTrabajoModel {
    constructor(
        // mapeo de la tabla  tbl_tipo_organizacion
        public idPerfil: number,
        public codPerfil: string,
        public acronimo_tipo_organizacion: string,
        public descripcion_tipo_organizacion: string,
        public activado: boolean = true,
    ) { }
}
