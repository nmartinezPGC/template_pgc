/**
 * @author David Pavon
 * @returns mapeo de la variables
 * @name AgregarCategoriaModel
 * @alias _AgregarCategoriaModel
 * @version 1.0.0
 * @fecha 23/01/2019
 *
 */
export class AgregarCategoriaModel {
    constructor(
        // mapeo de la tabla  tbl_tipo_organizacion
        public acronimoCatOrganizacion: string,
        public activo: boolean = true,
        public codCatOrganizacion: String,
        public descCatOrganizacion: String,
        public fechaCreacion: string,
        public horaCreacion: Date,
        public idCatOrganizacion: number,

        // mapeo de la variables que estan relacionadas con la gtabla
        public idTipoOrganizacionCat: { idTipoOrganizacion: number },
        public descTipoOrganizacion : string,
        public idTipoOrganizacion: number,
        public codTipoOrganizacion: string,
    ) { }
}
