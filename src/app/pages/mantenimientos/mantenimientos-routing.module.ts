import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos los Components de cada Seccion
import { MantenimientosComponent } from './mantenimientos.component';
import { UsuariosComponent } from './mant-seguridad/usuarios/usuarios.component';
import { MantSeguridadComponent } from './mant-seguridad/mant-seguridad.component';

// Mapeo de las Rutas del Modulo
const routes: Routes = [{
  path: '',
  component: MantenimientosComponent,
  children: [{
    path: 'mant-seguridad',
    component: MantSeguridadComponent,
  }],
}];

// Definicion del Modulo de la Clase
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientosRoutingModule { }

// Exportamos las Rutas del Modulo de Mantenimientos
export const routedComponentsMant = [
  MantenimientosComponent,
  MantSeguridadComponent,
];
