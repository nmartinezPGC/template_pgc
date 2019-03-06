import { NgModule } from '@angular/core';

// Imports de Tabla Smart de Angular
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { SmartTableService } from '../../@core/data/smart-table.service';

// Imports de Toaster-Notification Service
import { ToasterModule } from 'angular2-toaster';

// Imports de Material Angular
import { MatButtonModule, MatExpansionModule } from '@angular/material';

import { Ng2CompleterModule } from 'ng2-completer';

import { ThemeModule } from '../../@theme/theme.module';
import { ActivitiesRoutingModule, routedComponents } from './activities-routing.module';

// Imports de las Librerias de uso Comun de la Clase en el Formulario de Actividad
import { ListasComunesService } from '../common-list/services/listas-comunes.service';
import { FilterdataPipe } from './pipes/filterdata.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NbRouteTabsetModule } from '@nebular/theme/components/route-tabset/route-tabset.module';

// Modulo de Mapas
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';

@NgModule({
  imports: [
    ThemeModule,
    ActivitiesRoutingModule,
    Ng2SmartTableModule, // Modulo Base del pluguin de TableSmart
    ToasterModule.forRoot(), // Modulo de Toaster-Notification
    Ng2CompleterModule,
    MatButtonModule,
    MatExpansionModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    FormsModule,
    MyDatePickerModule, // Modulo de Fechas
    NgxSpinnerModule, // Modulo de Spinner
    NbRouteTabsetModule, // Modulo de Rutas para los tabs,
    LeafletModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterdataPipe,
    UbicacionComponent,
  ],
  providers: [
    // SmartTableService, // Defincion del Servicio que provee los Datos de la Tabla: ID's Internas
    ListasComunesService,
  ],
})
export class ActivitiesPGCModule {}
