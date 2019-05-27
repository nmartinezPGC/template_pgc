/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// make sure the path is correct for your setup
import { NgxAuthComponent } from './@theme/components/auth/auth.component';
import { NgxAuthBlockComponent } from './@theme/components/auth/auth-block/auth-block.component';
import { NgxLoginComponent } from './@theme/components/auth/login/login.component';
import { NgxLogoutComponent } from './@theme/components/auth/logout/logout.component';
import { RequestPasswordComponent} from './@theme/components/auth/request-password/request-password.component';
// import { EspaciosTrabajoModalComponent } from './pages/mantenimientos/mant-espacios-trabajo/espacios-trabajo/espacios-trabajo-modal/espacios-trabajo-modal.component';
import { EspaciosTrabajoModalComponent } from './pages/mantenimientos/mant-espacios-trabajo/espacios-trabajo/espacios-trabajo-modal/espacios-trabajo-modal.component';
// import { EspaciosTrabajoModal } from './espacios-trabajo-modal.ts/espacios-trabajo-modal.ts.component';

@NgModule({
  declarations: [AppComponent, // Auth Module
    NgxAuthComponent,
    NgxAuthBlockComponent,
    NgxLoginComponent,
    NgxLogoutComponent,
   // EspaciosTrabajoModalComponent,
    // EspaciosTrabajoModalComponent,
    // EspaciosTrabajoModal.TsComponent,
   // RecursosProyectoComponent,


    /*NgxRegisterComponent,
    NgxRequestPasswordComponent,
    NgxResetPasswordComponent,
    */],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    // AuthService,
  ],
})
export class AppModule {
}
