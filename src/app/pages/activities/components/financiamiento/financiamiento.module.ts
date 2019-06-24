/**
* @author Nahum Martinez
* @returns Agrupamiento de Componentes de Financiamiento
* @name FinanciamientoModule
* @alias _financiamientoModule
* @version 1.0.0
* @fecha 24-06-2019
*/

import { NgModule } from '@angular/core';

// Financiamiento Encabezado
import { FinanciamientoComponent } from './financiamiento.component';
import { FinancEncabezadoComponent } from './financ-encabezado/financ-encabezado.component';

// Financiamiento Detalle
import { FinancDetalleComponent } from './financ-detalle/financ-detalle.component';
import { FinancDetalleCompromisosComponent } from './financ-detalle/financ-detalle-compromisos/financ-detalle-compromisos.component';
import { FinancDetalleCompromisosFormComponent } from './financ-detalle/financ-detalle-compromisos/financ-detalle-compromisos-form/financ-detalle-compromisos-form.component';
import { FinancDetalleDesembolsosComponent } from './financ-detalle/financ-detalle-desembolsos/financ-detalle-desembolsos.component';
import { FinancDetalleDesembolsosFormComponent } from './financ-detalle/financ-detalle-desembolsos/financ-detalle-desembolsos-form/financ-detalle-desembolsos-form.component';
import { FinancDetalleGastosComponent } from './financ-detalle/financ-detalle-gastos/financ-detalle-gastos.component';
import { FinancDetalleGastosFormComponent } from './financ-detalle/financ-detalle-gastos/financ-detalle-gastos-form/financ-detalle-gastos-form.component';


@NgModule({
  declarations: [],
  imports: [
    FinanciamientoComponent,
    FinancEncabezadoComponent,
    FinancDetalleComponent,
    FinancDetalleCompromisosComponent,
    FinancDetalleCompromisosFormComponent,
    FinancDetalleDesembolsosComponent,
    FinancDetalleDesembolsosFormComponent,
    FinancDetalleGastosComponent,
    FinancDetalleGastosFormComponent,
  ],
})
export class FinanciamientoModule { }
