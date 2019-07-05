/**
* @author Nahum Martinez
* @returns Rutas de Ubicacion
* @name UbicacionRoutingModule
* @alias _ubicacionRoutingModule
* @version 1.0.0
* @fecha 29-06-2019
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionProyectoComponent } from './ubicacion-proyecto/ubicacion-proyecto.component';
import { UbicacionComponent } from './ubicacion.component';

// Constante de las rutas
const routes: Routes = [{
  path: '',
  component: UbicacionComponent,
  children: [
    {
      path: 'ubicacion-proyecto',
      component: UbicacionProyectoComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionRoutingModule { }

// Exportamos los componentes
export const routedComponents = [
  UbicacionComponent,
  UbicacionProyectoComponent,
];
