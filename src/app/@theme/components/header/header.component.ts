import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

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

  userMenu = [{ title: 'Perfil' }, { title: 'Desconectar' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.eva);

    // alert( this.userService.getIdentity().userName );
    // alert( this.userService.getIdentity().token );
    this.userService.getUserDetails( this.userService.getIdentity().userName ).subscribe(
      result => {

          if (result.code !== 200) {
               console.log( result.data );
          } else {
              // this.productos = result.data;
          }
      },
      error => {
        // console.log( error );
          // console.log(<any>error);
      },
  );

  }

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
}
