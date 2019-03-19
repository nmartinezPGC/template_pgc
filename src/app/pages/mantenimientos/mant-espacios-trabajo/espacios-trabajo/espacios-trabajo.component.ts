/**
 * @author David Pavon
 * @returns mantenimiento de organizacion.
 * @name espacioTrabajoComponent
 * @alias espacioTrabajoComponent
 * @version 1.0.0
 *
 */
import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { EspacioTrabajoService } from '../../services/espacio-trabajo.service';

@Component({
  selector: 'ngx-espacios-trabajo',
  templateUrl: './espacios-trabajo.component.html',
  styleUrls: ['./espacios-trabajo.component.scss'],
 providers: [EspacioTrabajoService],
})
export class EspaciosTrabajoComponent implements OnInit {
  public JsonReceptionEstados: any;
  public JsonReceptionTipo: any;
  data2: any;
  data3: any;

  constructor(public _listasComunesService: EspacioTrabajoService , protected _router: Router) { }

  ngOnInit() {
    this.estadoService();
    this.TipoService();
  }

   /****************************************************************************
 * Funcion: estadoService
 * Object Number: 007
 * Fecha: 22-01-2019
 * Descripcion: Method estadoService of the Class
 * Objetivo: estadoService detalle de los estados del usuario llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
private estadoService() {
  const idGroupSen: number = 4;
  this._listasComunesService.getAllEstados(idGroupSen).subscribe(
    response => {
      if (response.status !== 200) {

      } else if (response.status === 200) {
        this.JsonReceptionEstados = response.data;
        this.data2 = this.JsonReceptionEstados;
        // Carga los Items para el List de la Smart table
      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);

      // Borramos los datos del LocalStorage
      localStorage.removeItem('auth_app_token');
      localStorage.removeItem('identity');

      const redirect = '/auth/login';
      setTimeout(() => {
        // Iniciativa Temporal
        location.reload();
        return this._router.navigateByUrl(redirect);
      }, 2000);
    },
  );
} // FIN | estadoService

   /****************************************************************************
 * Funcion: estadoService
 * Object Number: 007
 * Fecha: 22-01-2019
 * Descripcion: Method estadoService of the Class
 * Objetivo: estadoService detalle de los estados del usuario llamando a la API
 * Autor: Edgar Ramirez
 ****************************************************************************/
private TipoService() {
  const idTipoSen: number = 4;
  console.log(this.data3);
  this._listasComunesService.getAllTipo(idTipoSen).subscribe(
    response => {
      console.log(this.data3)
      if (response.status !== 200) {
          console.log(response.status);
      } else if (response.status === 200) {
        this.JsonReceptionTipo = response.data;
        this.data2 = this.JsonReceptionTipo;
        console.log(this.data3);
        // Carga los Items para el List de la Smart table
      }
    },
    error => {
      // Redirecciona al Login
      alert('Error en la petición de la API ' + <any>error);

      // Borramos los datos del LocalStorage
      localStorage.removeItem('auth_app_token');
      localStorage.removeItem('identity');

      const redirect = '/auth/login';
      setTimeout(() => {
        // Iniciativa Temporal
        location.reload();
        return this._router.navigateByUrl(redirect);
      }, 2000);
    },
  );
} // FIN | estadoService

}
