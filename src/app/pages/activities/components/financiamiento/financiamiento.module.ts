/**
* @author Nahum Martinez
* @returns Agrupamiento de Componentes de Financiamiento
* @name FinanciamientoModule
* @alias _financiamientoModule
* @version 1.0.0
* @fecha 09-07-2019
*/

import { NgModule } from '@angular/core';

// Rutas del Modulo de Financiamiento
import { FinanciamientoRoutingModule, routedComponents } from './financiamiento-routing.module';

// Modulo de thema Akevo
import { ThemeModule } from '../../../../@theme/theme.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { CalendarModule, DialogModule, AccordionModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// Configuracion de mascara de Dinero
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
  imports: [ // NAM|2019-07-09
    ThemeModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
    FinanciamientoRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ConfirmationService,
  ],
  exports: [
    ...routedComponents,
  ],
})
export class FinanciamientoModule { }
