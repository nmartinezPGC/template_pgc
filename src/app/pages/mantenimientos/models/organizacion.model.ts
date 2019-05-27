/**
 * @author David Pavon
 * @returns mapeo de la variables
 * @name OrganizacionModel
 * @alias _OrganizacionModel
 * @version 1.0.0
 * @fecha 07/02/2019
 *
 */
export class OrganizacionModel {
    constructor(
        
        // mapeo de la tabla tbl_organizaciones
        public activo: boolean = true,
        public idOrganizacion: number,
        public codOrganizacion: string,
        public inicalesOrganizacion: string,
        public nombreOrganizacion: string,
        public descOrganizacion: string,
        public direccionFisicaOrganizacion: string,
        public telefonoOrganizacion: string,
        public deptoReferencia: string,
        public contactoReferencia: string,
        public socioDesarrollo: boolean = true,
        public agenciaBeneficiaria: boolean = true,
        public unidadEjecutora: boolean = true,
        public administradorFinanciero: boolean = true,
        public emailOrganizacion: Date,
        public webOrganizacion: string,
        // mapeo de la variables que estan relacionadas con la tabla
        public idPaisOrganizacion: { idPais: number },
        public idPais: number,
        // mapeo de la variables que estan relacionadas con la tabla
        public idTipoOrganizacion: { idTipoOrganizacion: number },
        public idTipoOrganizacion1: number,

        // mapeo de la variables que estan relacionadas con la tabla
        public idCatOrganizacion: { idCatOrganizacion: number },
        public idCatOrganizacion1: number,

        // mapeo de la variables que estan relacionadas con la tabla
    ) {
    }
}
