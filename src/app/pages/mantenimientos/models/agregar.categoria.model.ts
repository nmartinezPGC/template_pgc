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
        public idCatOrganizacion: number,
        public codCatOganizacion: string,
        public descCatorganizacion: string,
        public acronimoCatOrganizacion: string,
        public activo: boolean = true,
        public fechaCreacion: Date,
        public horaCreacion: Date,
        // mapeo de la variables que estan relacionadas con la gtabla
        public idTipoOrganizacion: number,
        public codTipoOrganizacion: string,
        public descTipoOrganizacion: string,
    ) { }
}
