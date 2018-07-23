/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  // Constante del Token LocalStorege
  _token = localStorage.getItem('auth_app_token');

  constructor(private analytics: AnalyticsService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();

    if ( this._token == null ) {
      // Redireccionamos al Login si el Toke es Nulo
      this._router.navigateByUrl('/auth/login');
    }
  }
}
