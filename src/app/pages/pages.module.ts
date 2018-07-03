import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

// Imports del Modulo de Actividades | 2018-07-02
//import { NewActivityComponent } from './activities/new-activity/new-activity.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    // Modulo de Actividades
    //NewActivityComponent,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    //NewActivityComponent,
  ],
})
export class PagesModule {
}
