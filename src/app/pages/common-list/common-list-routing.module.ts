import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonListComponent } from './common-list.component';
// import { NewActivityComponent } from './new-activity/new-activity.component';

const routes: Routes = [{
  path: '',
  component: CommonListComponent,
  children: [{
    path: 'new-estado',
    // component: NewActivityComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonListRoutingModule { }

export const routedComponents = [
  CommonListComponent,
  // NewActivityComponent,
];
