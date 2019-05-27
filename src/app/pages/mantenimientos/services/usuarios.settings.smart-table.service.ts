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

    configSmartTable(smartTable: string, smartNormal: number, array: any) {
        switch (smartTable) {
            case 'userSmart':
                switch (smartNormal) {
                    case 1:
                        // estructura de la smart table donde mostramos los datos de los usuarios
                        const settings = {
                            hideSubHeader: false,

                            actions: {
                                add: false,
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
                                            list: array,
                                        },
                                    },
                                },
                                idPais: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idPaisUsuario.descPais,
                                    title: 'Pais',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: array,
                                        },
                                    },
                                },
                                idEstado: {
                                    // valuePrepareFunction: (cell: any, row: any) => row.idEstadoUsuario.descEstado,
                                    title: 'Estado Usuario',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: [{ value: '1', title: 'Activo' }, { value: '2', title: 'Inactivo' }],
                                        },
                                    },
                                },
                                idCatOrganizacion: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idCatOrganizacionUsuario.descCatOrganizacion,
                                    title: 'Categoria',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: array,
                                        },
                                    },
                                },
                                idOrganizacion: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idOrganizacionUsuario.descOrganizacion,
                                    title: 'Organizaciones',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: array,
                                        },
                                    },
                                },
                                idTipoOrganizacion: {
                                    valuePrepareFunction: (cell: any, row: any) => row.idTipoOrganizacionUsuario.descTipoOrganizacion,
                                    title: 'Tipo Organizaciones',
                                    editor: {
                                        type: 'list',
                                        config: {
                                            list: array,
                                        },
                                    },
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
