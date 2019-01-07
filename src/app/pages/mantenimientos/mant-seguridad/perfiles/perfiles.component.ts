/**
 * @author David Pavon
 * @returns mantenimiento de perfiles
 * @name PerfilesComponent
 * @alias _perfilesComponent
 * @version 1.0.0
 *
 */
import { Component} from '@angular/core';

// Varieble Jquey
declare var jquery: any;
declare var $: any;



@Component({
  selector: 'ngx-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss'],
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class PerfilesComponent {
  data = [
    {
      id: 1,
      perfil: 'Administrador',
      desc_perfil: 'Administrador de la Plataforma'
    },
    {
      id: 2,
      perfil: 'Usuario',
      desc_perfil: 'Administrador de la Plataforma'
    },
    {
      id: 3,
      perfil: 'Super Usuario',
      desc_perfil: 'SU da la permisos para los demas Usuarios'
    },
  ];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Codigo de Perfil',
        type: 'number',
      },
      perfil: {
        title: 'Perfil',
        type: 'string',
      },
      desc_perfil: {
        title: 'Descripcion de Perfil',
        type: 'string',
      },
    },
  };
  // source: LocalDataSource = new LocalDataSource();
  // constructor(private service: SmartTableService) {
  //   const data = this.service.getData();
  //   this.source.load(data);
  // }

  constructor() {
    console.log(this.data)            
  }            
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  // onSearch(query: string = '') {
  //   this.source.setFilter([
  //     // fields we want to include in the search
  //     {
  //       field: 'id',
  //       search: query
  //     },
  //     {
  //       field: 'name',
  //       search: query
  //     },
  //     {
  //       field: 'username',
  //       search: query
  //     },
  //     {
  //       field: 'email',
  //       search: query
  //     }
  //   ], false); 
  // }
}

