import { Component, OnInit, Input } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'ngx-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.scss'],
})
export class GeolocalizacionComponent implements OnInit {
  // Dato
  @Input() dato = null;

  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;

  ngOnChanges(changes) {
    if (changes['idProyectoTab']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.idProyectoTab;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
