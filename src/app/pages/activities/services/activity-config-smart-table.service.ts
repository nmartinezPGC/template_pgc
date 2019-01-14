/**
 * @author Nahum Martinez
 * @returns servicios de Actividades
 * @name ActivityConfigSmartTableService
 * @alias _activityConfigSmartTableService
 * @version 1.0.0
 * @fecha 10/01/2019
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivityConfigSmartTableService {
  // Definicion de las Variables Globales
  public settings: any;

  constructor() { }

  /****************************************************************************
  * Funcion: configSmartTableIdInternas
  * Object Number: 001
  * Fecha: 10-01-2019
  * Descripcion: Method configSmartTableIdInternas of the Class
  * Objetivo: Establecer las Configuraciones para la Smart Table
  ****************************************************************************/
  configSmartTableIdInternas(listArrayData: any, listArrayData2: any, listArrayData3: any) {
    const settings = {
      // mode: 'external',
      add: {
        confirmCreate: true,
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true, // Confirma que se Actualizara la Informacion
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: { // Definicion de la Accion de los Botones de la Smart Table
        columnTitle: 'Acciones',
        add: true,
        delete: true,
        edit: true,
      },
      pager: { // Paginador de la Tabla
        perPage: 5,
      },
      columns: { // Definicion de las Columnas de Tabla
        /*idEstado: {
          title: 'ID',
          type: 'number',
          width: '5%',
          editable: false,
        },
        codEstado: {
          title: 'Codigo',
          type: 'text',
          width: '20%',
        },
        descEstado: {
          title: 'Descripcion',
          type: 'text',
          width: '70%',
        },*/
        /*idTipoOrganizacion: {
          title: 'Tipo Organización',
          width: '35%',
          editor: {
            type: 'list',
            config: {
              list: listArrayData,
            },
          },
        },
        idPaisOrganizacion: {
          title: 'País Organización',
          width: '35%',
          editor: {
            type: 'list',
            config: {
              selectText: 'País de Org',
              list: listArrayData2,
            },
          },
        },*/
        idOrganizacion: {
          title: 'Nombre Organizacion',
          width: '65%',
          editor: {
            type: 'list',
            config: {
              list: listArrayData3,
            },
          },
        },
        descOrganizacion: {
          title: 'Id Interna',
          type: 'text',
          width: '20%',
        },
      },
      attr: {
        class: 'table table-responsive',
      },
    };

    this.settings = settings;
    // Retorno
    // return
  }
} // FIN | configSmartTableIdInternas
