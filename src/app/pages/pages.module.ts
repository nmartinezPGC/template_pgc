import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { NbRouteTabsetModule } from '@nebular/theme/components/route-tabset/route-tabset.module';
// import { RecursosProyectoComponent } from './app/pages/activities/components/recursos-proyecto/recursos-proyecto.component';
 // <-- import the module

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    NgxPaginationModule,
    NbRouteTabsetModule, // Modulo de Rutas para los tabs
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  //  RecursosProyectoComponent,
  ],
})
export class PagesModule {
}
