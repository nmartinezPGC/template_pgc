import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by" tittle="Nahum Martinez" >Copyright  &copy; 2019 <b><a href="http://www.sreci.gob.hn/"
    target="_blank">Secretaría de Relaciones Exteriores y Cooperación Internacional | SRECI </a></b> PGC v2.0.0 </span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      </div>
      `,
    })
    // <a href="#" target="_blank" class="ion ion-social-twitter"></a>
    // <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    export class FooterComponent {
}
