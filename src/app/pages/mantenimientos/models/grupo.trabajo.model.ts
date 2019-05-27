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
        public idTipoOrganizacion: number,
        public codTipoOrganizacion: string,
        public acronimoTipoOrganizacion: string,
        public descTipoOrganizacion: string,
        public activo: boolean = true,
        public fechaCreacion: Date,
        public horaCreacion: Date,
    ) { }
}

