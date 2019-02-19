import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesComponent } from './activities.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';

const routes: Routes = [{
  path: '',
  component: ActivitiesComponent,
  children: [
    {
      path: 'new-activity',
      component: NewActivityComponent,
    },
    {
      path: 'datos-generales',
      component: DatosGeneralesComponent,
    },
    {
      path: 'geolocalizacion',
      component: GeolocalizacionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesRoutingModule { }

export const routedComponents = [
  ActivitiesComponent,
  NewActivityComponent,
  DatosGeneralesComponent,
  GeolocalizacionComponent,
];
