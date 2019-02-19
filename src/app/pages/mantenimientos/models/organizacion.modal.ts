/**
 * @author David Pavon
 * @returns mapeo de la variables
 * @name OrganizacionModel
 * @alias _OrganizacionModel
 * @version 1.0.0
 * @fecha 07/02/2019
 *
 */
export class OrganizacionModal {
    constructor(
        // mapeo de la tabla tbl_organizaciones
        // public activo: boolean = true,
        // public idOrganizacion: number,
        public codOrganizacionModal: string,
        public inicalesOrganizacionModal: string,
        public nombreOrganizacionModal: string,
        public descOrganizacionModal: string,
        public direccionFisicaOrganizacionModal: string,
        public telefonoOrganizacionModal: string,
        public deptoReferenciaModal: string,
        public contactoReferenciaModal: string,
        public socioDesarrolloModal: boolean = true,
        public agenciaBeneficiariaModadal: boolean = true,
        public unidadEjecutoraModal: boolean = true,
        public administradorFinancieroModal: boolean = true,
        public emailOrganizacionModal: Date,
        public webOrganizacionModal: string,
        // mapeo de la variables que estan relacionadas con la tabla
        public idPaisOrganizacion: { idPais: number },
        public idPais: number,
        public descPais: string,
        // // mapeo de la variables que estan relacionadas con la tabla
        public idTipoOrganizacion: { idTipoOrganizacion: number },
        public idTipoOrganizacion1Modal: number,

        // // mapeo de la variables que estan relacionadas con la tabla
        public idCatOrganizacion: { idCatOrganizacion: number },
        public idCatOrganizacion1Modal: number,

        // mapeo de la variables que estan relacionadas con la tabla
    ) {
    }
}
