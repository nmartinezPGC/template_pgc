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
                                codigo: {
                                    title: 'Codigo',
                                    type: 'string',
                                },
                                nombre1: {
                                    title: 'Primer Nombre',
                                    type: 'string',
                                },
                                nombre2: {
                                    title: 'Segundo Nombre',
                                    type: 'string',
                                },
                                apellido1: {
                                    title: 'Primer Apellido',
                                    type: 'string',
                                },
                                apellido2: {
                                    title: 'Segundo Apellido',
                                    type: 'string',
                                },
                                iniciales: {
                                    title: 'Iniciales',
                                    type: 'string',
                                },
                                email: {
                                    title: 'Email',
                                    type: 'string',
                                },
                                password: {
                                    title: 'Password',
                                    type: 'string',
                                },
                                tipUsuario: {
                                    title: 'Tipo de Usuario',
                                    type: 'string',
                                },
                                pais: {
                                    title: 'Pais',
                                    type: 'string',
                                },
                                // estadoUsuario: {
                                //   title: 'Estado',
                                //   type: 'string',
                                // },
                                // perfilUsuario: {
                                //   title: 'Perfil Usuario',
                                //   type: 'string',
                                // },
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
