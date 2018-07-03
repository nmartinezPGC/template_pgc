import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ActivitiesRoutingModule, routedComponents } from './activities-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ActivitiesRoutingModule
  ],
  declarations: [
    ...routedComponents
  ],
})
export class ActivitiesPGCModule {}
