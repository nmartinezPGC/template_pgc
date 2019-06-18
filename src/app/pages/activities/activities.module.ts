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
import { OdsComponent } from './components/sectores-programas/sectores/ods/ods.component';
import { ProgramasComponent } from './components/sectores-programas/programas/programas.component';
import { SectoresProgramasOdsComponent } from './components/sectores-programas/sectores/sectores-ods.component';

// Modulo de la Libreria Primeng
import { FieldsetModule } from 'primeng/fieldset';
import { TreeModule } from 'primeng/tree';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ListboxModule } from 'primeng/listbox';
import { RecursosProyectoComponent } from './components/recursos-proyecto/recursos-proyecto.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule, EditorModule, AutoCompleteModule, KeyFilterModule, CalendarModule, DialogModule, InputMaskModule, AccordionModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FilterPipe } from './pipes/filter.pipe';

// Sectores de Proyectos
import { SectoresGobiernoComponent } from './components/sectores-programas/sectores/sectores-gobierno/sectores-gobierno.component';
import { SectoresOcdeComponent } from './components/sectores-programas/sectores/sectores-ocde/sectores-ocde.component';
import { SectoresCamposTransversalesComponent } from './components/sectores-programas/sectores/sectores-campos-transversales/sectores-campos-transversales.component';

// Programas de Nacion
import { VisionPaisComponent } from './components/sectores-programas/programas/visionpais/visionpais.component';
import { VidaMejorComponent } from './components/sectores-programas/programas/vida-mejor/vida-mejor.component';
import { PlanNacionComponent } from './components/sectores-programas/programas/plan-nacion/plan-nacion.component';
import { OdsModalMetasComponent } from './components/sectores-programas/sectores/ods/modals/ods-modal-metas/ods-modal-metas.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';
import { SocioDesarrolloComponent } from './components/organizaciones/socio-desarrollo/socio-desarrollo.component';
import { PoliticasPublicasComponent } from './components/sectores-programas/programas/politicas-publicas/politicas-publicas.component';
import { UnidadEjecutoraComponent } from './components/organizaciones/unidad-ejecutora/unidad-ejecutora.component';
import { AdmonFinancieroComponent } from './components/organizaciones/admon-financiero/admon-financiero.component';
import { AgenciaBeneficiariaComponent } from './components/organizaciones/agencia-beneficiaria/agencia-beneficiaria.component';

// Financiamiento de Proyecto
import { FinancEncabezadoComponent } from './components/financiamiento/financ-encabezado/financ-encabezado.component';
import { FinancDetalleComponent } from './components/financiamiento/financ-detalle/financ-detalle.component';
import { FinancDetalleCompromisosComponent } from './components/financiamiento/financ-detalle/financ-detalle-compromisos/financ-detalle-compromisos.component';
import { FinancDetalleDesembolsosComponent } from './components/financiamiento/financ-detalle/financ-detalle-desembolsos/financ-detalle-desembolsos.component';
import { FinancDetalleGastosComponent } from './components/financiamiento/financ-detalle/financ-detalle-gastos/financ-detalle-gastos.component';
import { FinanciamientoComponent } from './components/financiamiento/financiamiento.component';

// Monedas
import { NgxCurrencyModule } from 'ngx-currency';
import { FinancDetalleCompromisosFormComponent } from './components/financiamiento/financ-detalle/financ-detalle-compromisos/financ-detalle-compromisos-form/financ-detalle-compromisos-form.component';
import { FinancDetalleDesembolsosFormComponent } from './components/financiamiento/financ-detalle/financ-detalle-desembolsos/financ-detalle-desembolsos-form/financ-detalle-desembolsos-form.component';
import { FinancDetalleGastosFormComponent } from './components/financiamiento/financ-detalle/financ-detalle-gastos/financ-detalle-gastos-form/financ-detalle-gastos-form.component';
import { DocumentosComponent } from './components/recursos-proyecto/documentos/documentos.component';
import { LinkComponent } from './components/recursos-proyecto/link/link.component';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: ',',
  nullable: true,
};

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
    FieldsetModule,
    TreeModule,
    DropdownModule,
    ConfirmDialogModule,
    EditorModule,
    MessagesModule,
    MessageModule,
    ListboxModule,
    FileUploadModule, // modulo de file upload
    AutoCompleteModule,
    KeyFilterModule,
    CalendarModule,
    DialogModule,
    InputMaskModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    AccordionModule, // NAM|2019-05-28
  ],
  declarations: [
    ...routedComponents,
    FilterdataPipe,
    UbicacionComponent,
    OdsComponent,
    ProgramasComponent,
    SectoresProgramasOdsComponent,
    RecursosProyectoComponent,
    FilterPipe,
    SectoresGobiernoComponent,
    SectoresOcdeComponent,
    SectoresCamposTransversalesComponent,
    VisionPaisComponent,
    VidaMejorComponent,
    PlanNacionComponent,
    PoliticasPublicasComponent,
    OdsModalMetasComponent,
    OrganizacionesComponent,
    SocioDesarrolloComponent,
    PoliticasPublicasComponent,
    UnidadEjecutoraComponent,
    AdmonFinancieroComponent,
    AgenciaBeneficiariaComponent,
    FinancEncabezadoComponent,
    FinancDetalleComponent,
    FinancDetalleCompromisosComponent,
    FinancDetalleDesembolsosComponent,
    FinancDetalleGastosComponent,
    FinanciamientoComponent,
    FinancDetalleCompromisosFormComponent,
    FinancDetalleDesembolsosFormComponent,
    FinancDetalleGastosFormComponent,
    DocumentosComponent,
    LinkComponent,
  ],
  providers: [
    // SmartTableService, // Defincion del Servicio que provee los Datos de la Tabla: ID's Internas
    ListasComunesService,
    ConfirmationService,
  ],
  entryComponents: [
    OdsModalMetasComponent,
    FinancDetalleCompromisosFormComponent,
  ],
})
export class ActivitiesPGCModule { }
