

/**
 * @author Jorge Escamilla
 * @returns mapeo de la variables
 * @name contactosModel
 * @alias _contactosModel
 * @version 1.0.0
 * @fecha 28/06/2019
 *
 */
export class ContactosModel {

    constructor(
        // mapeo de la tabla  tbl_actividades_contacto
        // datos generales
        public activo: boolean = true,
        public idContacto: number,
        public codigoContacto: string,
        // datos de la tabala de Contactos
        public nombreContacto: string,
        public apellidoContacto: String,
        public funcionContacto: string,
        public organizacionContacto: string,
        public dFisicaContacto: string,
        public email1Contacto: string,
        public email2Contacto: string,
        public telefono1Contacto: string,
        public telefono2Contacto: string,
        public ext1Contacto: string,
        public ext2Contacto: string,
        public fechaCreacion: Date,
        public horaCreacion: Date,
        // datos relacionados con la tabla
        public idTrato: { idTrato: number },
        public idTratoIN: number,
        public idOrganizacion: { idOrganizacion: number},
        public IdOrgIN: number,

    ) { }
}
