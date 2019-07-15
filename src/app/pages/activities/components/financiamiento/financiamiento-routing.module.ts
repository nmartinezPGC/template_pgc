/**
* @author Nahum Martinez
* @returns Rutas de Financiamiento
* @name FinanciamientoRoutingModule
* @alias _financiamientoRoutingModule
* @version 1.0.0
* @fecha 09-07-2019
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Encabezado de Financiamiento
import { FinanciamientoComponent } from './financiamiento.component';
import { FinancEncabezadoComponent } from './financ-encabezado/financ-encabezado.component';

// Detalle de Financiamiento
import { FinancDetalleComponent } from './financ-detalle/financ-detalle.component';
import { FinancDetalleCompromisosComponent } from './financ-detalle/financ-detalle-compromisos/financ-detalle-compromisos.component';
import { FinancDetalleDesembolsosComponent } from './financ-detalle/financ-detalle-desembolsos/financ-detalle-desembolsos.component';
import { FinancDetalleGastosComponent } from './financ-detalle/financ-detalle-gastos/financ-detalle-gastos.component';
import { FinancDetalleCompromisosFormComponent } from './financ-detalle/financ-detalle-compromisos/financ-detalle-compromisos-form/financ-detalle-compromisos-form.component';
import { FinancDetalleDesembolsosFormComponent } from './financ-detalle/financ-detalle-desembolsos/financ-detalle-desembolsos-form/financ-detalle-desembolsos-form.component';
import { FinancDetalleGastosFormComponent } from './financ-detalle/financ-detalle-gastos/financ-detalle-gastos-form/financ-detalle-gastos-form.component';


// Constante de las rutas
const routes: Routes = [{
  path: '',
  component: FinanciamientoComponent,
  children: [
    {
      path: 'financiamiento-encabezado',
      component: FinancEncabezadoComponent,
    },
    {
      path: 'financiamiento-detalle',
      component: FinancDetalleComponent,
    },
    {
      path: 'financiamiento-detalle-compromisos',
      component: FinancDetalleCompromisosComponent,
    },
    {
      path: 'financiamiento-detalle-desembolsos',
      component: FinancDetalleDesembolsosComponent,
    },
    {
      path: 'financiamiento-detalle-gastos',
      component: FinancDetalleGastosComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanciamientoRoutingModule { }

// Exportamos los componentes
export const routedComponents = [
  FinanciamientoComponent,
  FinancEncabezadoComponent,
  FinancDetalleComponent,
  FinancDetalleCompromisosComponent,
  FinancDetalleCompromisosFormComponent,
  FinancDetalleDesembolsosComponent,
  FinancDetalleDesembolsosFormComponent,
  FinancDetalleGastosComponent,
  FinancDetalleGastosFormComponent,
];
