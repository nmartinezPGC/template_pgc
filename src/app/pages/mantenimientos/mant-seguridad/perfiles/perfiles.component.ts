/**
 * @author Edgar Ramirez
 * @returns mantenimiento de perfiles
 * @name PerfilesComponent
 * @alias _perfilesComponent
 * @version 1.0.0
 *
 */
import { Component, OnInit } from '@angular/core';

// Varieble Jquey
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'ngx-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss'],
})
export class PerfilesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.fillDataTable();
  }

  /*
   * Funcion: FND-00001 Fecha: 20-12-2018
   * Descripcion: Realiza el llenado de la Tabla: Perfiles con Todos los Filtros
   * Params: null
  **/
  // fillDataTable() {
  //   setTimeout(function () {
  //     $(function () {
  //       $('#table').DataTable({
  //         dom: 'Bfrtip',
  //         fixedHeader: true,
  //         'autoWidth': false,
  //         // Tamaño de la Pagina
  //         'pageLength': 10,
  //         // Refresca la Data y Borra de Memoria los Datos anteriores
  //         destroy: true,
  //         retrieve: true,

  //         // Selecciona las Filas
  //         select: true,
  //       });

  //     });
  //   }, 500);
  // }
}
