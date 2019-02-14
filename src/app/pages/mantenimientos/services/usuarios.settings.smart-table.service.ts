/**
 * @author Edgar Ramirez
 * @returns servicio de actividades de smart table
 * @name ConfigSmartTableService
 * @alias _configSmartTableService
 * @version 1.0.0
 * @fecha 17/01/2019
 */

import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class ConfigSmartTableService {
    // Definicion de las variables Globales
    public settings: any;
    constructor() { }

    daysOfTheWeekList: [{ value: 0, title: 'Monday' }, { value: 1, title: 'Tuesday' }]

    /****************************************************************************
  * Funcion: configSmartTable
  * Object Number: 001
  * Fecha: 17-01-2019
  * Descripcion: Method ConfigSmartTableService of the Class
  * Objetivo: Establecer las configuraciones para la Smart Table de usuarios
  ****************************************************************************/

    configSmartTable(smartTable: string, smartNormal: number, arrayPais: any, arrayEstado: any, arrayTipo: any, arrayCatOrg: any, arrayOrganizacion: any, arrayTipoOrganizacion: any) {
        switch (smartTable) {
            case 'userSmart':
                switch (smartNormal) {
                    case 1:
                        // estructura de la smart table donde mostramos los datos de los usuarios
                        const settings = {
                            hideSubHeader: false,

                            add: {
                                addButtonContent: '<i class="nb-plus"></i>',
                                createButtonContent: '<i class="nb-checkmark"></i>',
                                cancelButtonContent: '<i class="nb-close"></i>',
                            },
                            edit: {
                                editButtonContent: '<i class="nb-edit"></i>',
                                saveButtonContent: '<i class="nb-checkmark"></i>',
                                cancelButtonContent: '<i class="nb-close"></i>',
                                confirmSave: true,
                            },
                            delete: {
                                deleteButtonContent: '<i class="nb-trash"></i>',
                                confirmDelete: true,
                            },
                            columns: {
                                codUsuario: {
                                    title: 'Codigo',
                                    type: 'string',
                                },
                                nombre1Usuario: {
                                    title: 'Primer Nombre',
                                    type: 'string',
                                },
                                nombre2Usuario: {
                                    title: 'Segundo Nombre',
                                    type: 'string',
                                },
                                apellido1Usuario: {
                                    title: 'Primer Apellido',
                                    type: 'string',
                                },
                                apellido2Usuario: {
                                    title: 'Segundo Apellido',
                                    type: 'string',
                                },
                                inicialesUsuario: {
                                    title: 'Iniciales',
                                    type: 'string',
                                },
                                emailUsuario: {
                                    title: 'Email',
                                    type: 'string',
                                },
                                direccion: {
                                    title: 'Direccion',
                                    type: 'string',
                                },
                                idTipo: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idTipoUsuario.descTipo,
                                    title: 'Rol de Usuario',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: arrayTipo,
                                        },
                                    },
                                },
                                idPais: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idPaisUsuario.descPais,
                                    title: 'Pais',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: arrayPais,
                                        },
                                    },
                                },
                                idEstado: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idEstadoUsuario.descEstado,
                                    title: 'Estado Usuario',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: arrayEstado,
                                        },
                                    },
                                },
                                idCatOrganizacion: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idCatOrganizacionUsuario.descCatOrganizacion,
                                    title: 'Categoria',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: arrayCatOrg,
                                        },
                                    },
                                },
                                idOrganizacion: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idOrganizacionUsuario.descOrganizacion,
                                    title: 'Organizaciones',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: arrayOrganizacion,
                                        },
                                    },
                                },
                                idTipoOrganizacion: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idTipoOrganizacionUsuario.descTipoOrganizacion,
                                    title: 'Tipo Organizaciones',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: arrayTipoOrganizacion,
                                        },
                                    },
                                },
                                activo: {
                                    title: 'Activo',
                                    type: 'string',
                                },
                            },
                        };
                        // variable que retorne
                        this.settings = settings;
                        break;

                    case 2:
                        break;
                }
                break;
        }

    }
}
