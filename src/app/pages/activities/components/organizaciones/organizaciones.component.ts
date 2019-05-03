import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.scss'],
})
export class OrganizacionesComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  constructor() { }

  ngOnInit() {
  }

}
