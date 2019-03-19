// Imports nesesarios para trabajar con la Template
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

// Imports de la clase de Definicion de las Rutas
import { MantenimientosRoutingModule, routedComponentsMant } from './mantenimientos-routing.module';

// Imports de librerias prefabricadas y reutilizables
import { ListasComunesService } from '../common-list/services/listas-comunes.service';
import { MantEspaciosTrabajoComponent } from './mant-espacios-trabajo/mant.espacios.trabajo.component';
import { GrupoTrabajoComponent } from './mant-espacios-trabajo/grupo-trabajo/grupo.trabajo.component';
import { AgregarCategoriaComponent } from './mant-espacios-trabajo/agregar-categoria/agregar-categoria.component';
import { EspaciosTrabajoComponent } from './mant-espacios-trabajo/espacios-trabajo/espacios-trabajo.component';
import { OrganizacionComponent } from './mant-espacios-trabajo/organizacion/organizacion.component';
import { OrganizacionModalComponent } from './mant-espacios-trabajo/organizacion/organizaciones.modal.component';
import { UsuarioModalComponent } from './mant-seguridad/usuarios/usuario.modal.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FilterdataPipe } from '../mantenimientos/pipes/filterdata.pipe';

// Composicion del Modulo
@NgModule({
  imports: [
    ThemeModule,
    MantenimientosRoutingModule,
    ToasterModule.forRoot(), // Modulo de Toaster-Notificatiion
    NgxDatatableModule,
    Ng2SmartTableModule,
    AngularMultiSelectModule,
    NgxPaginationModule,
  ],
  declarations: [
    ...routedComponentsMant,
    MantEspaciosTrabajoComponent,
    GrupoTrabajoComponent,
    AgregarCategoriaComponent,
    EspaciosTrabajoComponent,
    OrganizacionComponent,
    OrganizacionModalComponent,
    UsuarioModalComponent,
    FilterdataPipe,
  ],
  entryComponents: [
    OrganizacionModalComponent,
    UsuarioModalComponent,
  ],
  providers: [
    ListasComunesService,
    SmartTableService,
    // Esta libreria contiene los llamados a servicios genericos de tablas de la BD
  ],
})
export class MantenimientosPGCModule { }
