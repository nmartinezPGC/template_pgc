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
    MyDatePickerModule,
  ],
  declarations: [
    ...routedComponents,
    FilterdataPipe,
  ],
  providers: [
    // SmartTableService, // Defincion del Servicio que provee los Datos de la Tabla: ID's Internas
    ListasComunesService,
  ],
})
export class ActivitiesPGCModule {}
