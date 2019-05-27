/**
 * @author Edgar Ramirez
 * @returns servicio de actividades de smart table
 * @name ConfigSmartTableService
 * @alias _configSmartTableService
 * @version 1.0.0
 * @fecha 10/01/2019
 */

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ConfigSmartTableService {
  // Definicion de las variables Globales
  public settings: any;
  constructor() { }



  /****************************************************************************
* Funcion: configSmartTable
* Object Number: 001
* Fecha: 10-01-2019
* Descripcion: Method ConfigSmartTableService of the Class
* Objetivo: Establecer las configuraciones para la Smart Table
****************************************************************************/

  configSmartTable(smartTable: string, smartNormal: number, array: any) {
    switch (smartTable) {
      case 'userSmart':
        switch (smartNormal) {
          case 1:
            const settings = {
              hideSubHeader : false,
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
                codTipoOrganizacion: {
                  title: 'Codigo de Tipo',
                  type: 'string',
                  editable: false,
                },
                acronimoTipoOrganizacion: {
                  title: 'acronimo',
                  type: 'string',
                },
                descTipoOrganizacion: {
                  title: 'Descripcion',
                  type: 'string',
                },
                // Json anidado para lograr capturar el valor de una entidad     ///https://github.com/akveo/ngx-admin/issues/1827
                // bibliografia : https://github.com/akveo/ng2-smart-table/issues/375
                activo: {
                  title: 'Habilitado',
                  type: 'list',
                // valuePrepareFunction: (cell: any, row: any) => row.activado,
                  editor: {
                    type: 'list',
                    config: {
                      list: [{value: 'true', title: 'Activo'}, {value: 'false', title: 'Inactivo'}],
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
