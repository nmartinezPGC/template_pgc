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
/*import { NgxRegisterComponent } from './components/auth/register/register.component';
import { NgxLogoutComponent } from './components/auth/logout/logout.component';
import { NgxRequestPasswordComponent } from './components/auth/request-password/request-password.component';
import { NgxResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
*/

// Nuevos Interceptores de las Entradas y Salidas Http
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptorService } from './@theme/components/auth/interceptors/token.interceptor';
// import { AuthService } from './@theme/components/auth/auth.service';

@NgModule({
  declarations: [AppComponent, // Auth Module
    NgxAuthComponent,
    NgxAuthBlockComponent,
    NgxLoginComponent,
    /*NgxRegisterComponent,
    NgxRequestPasswordComponent,
    NgxResetPasswordComponent,
    NgxLogoutComponent,*/],
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
