import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos los Components de cada Seccion
import { MantenimientosComponent } from './mantenimientos.component';
import { UsuariosComponent } from './mant-seguridad/usuarios/usuarios.component';
import { MantSeguridadComponent } from './mant-seguridad/mant-seguridad.component';
import { PerfilesComponent } from './mant-seguridad/perfiles/perfiles.component';
import { MantEspaciosTrabajoComponent } from './mant-espacios-trabajo/mant.espacios.trabajo.component';
import { GrupoTrabajoComponent } from './mant-espacios-trabajo/grupo-trabajo/grupo.trabajo.component';
import { AgregarCategoriaComponent } from './mant-espacios-trabajo/agregar-categoria/agregar-categoria.component';
import { OrganizacionComponent } from './mant-espacios-trabajo/organizacion/organizacion.component';


// Mapeo de las Rutas del Modulo
const routes: Routes = [{
  path: '',
  component: MantenimientosComponent,
  children: [
    {
      path: 'mant-seguridad',
      component: MantSeguridadComponent,
      /*children: [{
        path: 'usuarios',
        component: UsuariosComponent,
      }],*/
    },
    {
      path: 'mant-seguridad/usuarios',
      component: UsuariosComponent,
    },
    {
      path: 'mant-seguridad/perfiles',
      component: PerfilesComponent,
    },
    {
      path: 'mant-espacios-trabajo',
      component: MantEspaciosTrabajoComponent,
    },
    {
      path: 'mant-espacios-trabajo/grupo-trabajo',
      component: GrupoTrabajoComponent,
    },
    {
      path: 'mant-espacios-trabajo/agregar-categoria',
      component: AgregarCategoriaComponent,
    },
    {
      path: 'mant-espacios-trabajo/organizacion',
      component: OrganizacionComponent,
    },
  ],
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
  UsuariosComponent,
  PerfilesComponent,
];
