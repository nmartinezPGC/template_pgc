import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesComponent } from './activities.component';
import { NewActivityComponent } from './new-activity/new-activity.component';

const routes: Routes = [{
  path: '',
  component: ActivitiesComponent,
  children: [{
    path: 'new-activity',
    component: NewActivityComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesRoutingModule { }

export const routedComponents = [
  ActivitiesComponent,
  NewActivityComponent,
];
