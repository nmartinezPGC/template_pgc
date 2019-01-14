/**
 * @author Edgar Ramirez
 * @returns mantenimientos de usuario
 * @name UsuariosComponent
 * @alias _usuariosComponent
 * @version 1.0.0
 */
import { Component, OnInit } from '@angular/core';

// Varieble Jquey
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  // estructura de la smart table donde mostramos los datos de los usuarios
  settings = {
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
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
