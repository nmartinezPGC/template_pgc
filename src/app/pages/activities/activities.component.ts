import { Component } from '@angular/core';

@Component({
  selector: 'ngx-activities',
  template: ` <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item"><a href="#/">Actividades</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Ingreso de Actividad</li>
                </ol>
              </nav>
    <router-outlet></router-outlet>
  `,
})
export class ActivitiesComponent {
}
