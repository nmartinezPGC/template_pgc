import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-socio-desarrollo',
  templateUrl: './socio-desarrollo.component.html',
  styleUrls: ['./socio-desarrollo.component.scss'],
})
export class SocioDesarrolloComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;


  constructor() { }

  ngOnInit() {
  }

}
