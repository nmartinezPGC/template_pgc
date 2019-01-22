// Imports nesesarios para trabajar con la Template
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService  } from '../../@core/data/smart-table.service';


// Imports de la clase de Definicion de las Rutas
import { MantenimientosRoutingModule, routedComponentsMant } from './mantenimientos-routing.module';

// Imports de librerias prefabricadas y reutilizables
import { ListasComunesService } from '../common-list/services/listas-comunes.service';
import { MantEspaciosTrabajoComponent } from './mant-espacios-trabajo/mant.espacios.trabajo.component';
import { GrupoTrabajoComponent } from './mant-espacios-trabajo/grupo-trabajo/grupo.trabajo.component';

// Composicion del Modulo
@NgModule({
  imports: [
    ThemeModule,
    MantenimientosRoutingModule,
    ToasterModule.forRoot(), // Modulo de Toaster-Notificatiion
    NgxDatatableModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponentsMant,
    MantEspaciosTrabajoComponent,
    GrupoTrabajoComponent,
  ],
  providers: [
    ListasComunesService,
    SmartTableService,
     // Esta libreria contiene los llamados a servicios genericos de tablas de la BD
  ],
})
export class MantenimientosPGCModule { }
