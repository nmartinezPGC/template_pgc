import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  // Token
  // private _token: any;

  // User Details
  public firstName: String;
  public lastName: String;
  public firtSurname: String;
  public lastSurname: String;
  public completeName: String;

  userMenu = [{ title: 'Perfil', icon: 'fa fa-user', data: {path: '/logout'} },
              { title: 'Desconectar', icon: 'fa fa-sign-out', data: {path: 'auth/login/1'} }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              protected _router: Router) {
  }


  /****************************************************************************
  * Funcion: ngOnInit
  * Fecha: 23-07-2018
  * Descripcion: Method ngOnInit of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // Llamado a la Funcion de obtención del Usuario
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.eva);

    // Llamado a la Funcion del Menu Contextual
    this.onItemSelection();

    // Llamado al Servicio de detalle de Usuarios
    this.userService.getUserDetails( this.userService.getIdentity().userName )
      .subscribe(
        result => {
          if (result.code !== 200) {
              // Ejecución de la Data Obtenida
                this.user = result.data;
                this.completeName = result.data.nombre1Usuario + ' ' + result.data.apellido1Usuario;
          } else {
              // this.user = result.data;
          }
      },
      error => {
        alert( 'Error en la petición de la API ' + error );
      },
    );
  }// FIN | ngOnInit


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


  /****************************************************************************
  * Funcion: onItemSelection
  * Fecha: 23-07-2018
  * Descripcion: Method onItemSelection of the Menu User Class
  * Objetivo: LogOut and Perfil User in the API
  ****************************************************************************/
  onItemSelection() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu'),
        map((item) => item),
      )
      .subscribe(({ item }) => {
        // Condicionamos la opcion del Menú
        // this.window.alert(`${title} was clicked!`)
         alert( 'title ' + item.data.path );
           /*if ( item.title === 'Perfil' ) {
            // removemos el Token del LocalStorage
            alert('Ventana de cambiar el Perfil');
          }else if ( item.title === 'Desconectar' ) {
            localStorage.removeItem('auth_app_token');
            localStorage.removeItem('identity');
            // Redireccionamos al Login
            this._router.navigateByUrl(item.data.path);
          }*/
          this._router.navigateByUrl(item.data.path);
        },
      );
  }// FIN | onItemSelection
}
