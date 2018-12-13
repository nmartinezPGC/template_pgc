// Imports nesesarios para trabajar con la Template
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

// Imports de la clase de Definicion de las Rutas
import { MantenimientosRoutingModule, routedComponentsMant } from './mantenimientos-routing.module';

// Imports de librerias prefabricadas y reutilizables
import { ListasComunesService } from '../common-list/services/listas-comunes.service';

// Composicion del Modulo
@NgModule({
  imports: [
    ThemeModule,
    MantenimientosRoutingModule,
    ToasterModule.forRoot(), // Modulo de Toaster-Notification
  ],
  declarations: [
    ...routedComponentsMant,
  ],
  providers: [
    ListasComunesService, // Esta libreria contiene los llamados a servicios genericos de tablas de la BD
  ],
})
export class MantenimientosPGCModule { }
