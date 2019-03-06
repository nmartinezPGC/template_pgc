import { Component, OnInit, Input, OnChanges } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';

import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'ngx-geolocalizacion',
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.scss'],
})
export class GeolocalizacionComponent implements OnInit, OnChanges {
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

  // Variables Globales del Mapa
  datos = [];
  public marker1;
  layers = this.datos;

  // Definicion de Opciones del Mapa
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Creado por: Nahum Martínez' }),
    ],
    zoom: 8,
    detectRetina: true,
    center: latLng(14.520611, -87.136183),
  };

  // Capas del Mapa
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    },
    overlays: {
      'Tegucigalpa': L.circle([14.072275, -87.192139], { radius: 10000 }),
      'San Pedro Sula': L.circle([15.505230, -88.024971], { radius: 10000 }),
      // 'San Pedro Sula': L.polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    },
  }


  borrarMarcador(latlng) {
    // console.log('sdsd');
  }


  /****************************************************************************
  * Funcion: constructor
  * Object Number: 001
  * Fecha: 06-03-2019
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor(private activeModal: NgbActiveModal) { } // FIN constructor


  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: 002
  * Fecha: 06-03-2019
  * Descripcion: Method constructor of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // this.pointsVal();
  } // FIN ngOnInit


  /**
   * closeModal
   * Cerrar ventana Modal desde el boton
   */
  closeModal() {
    this.activeModal.close();
  }


  /****************************************************************************
  * Funcion: pointsRecsources
  * Object Number: 002
  * Fecha: 06-03-2019
  * Descripcion: Method constructor of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  pointsRecsources() {
    // const element = array[index];
    let lat = 15.505230;
    let long = -88.224971;

    for (let index = 0; index < 10; index++) {
      this.datos.push(
        L.marker([lat, long], {
          icon: icon({
            iconUrl: 'assets/icons/forms/map_24.png',
            shadowUrl: 'assets/icons/forms/map_24.png',
          }),
          draggable: true,
          riseOnHover: true,
        }).bindPopup('<h1>Coordenada ? ' + ' ' + lat + '  -  ' + long + ' </h1>'),
      )

      lat = lat + 0.1;
      long = long - 0.1;
    }
  } // FIN pointsRecsources


  /****************************************************************************
  * Funcion: onMapReady
  * Object Number: 004
  * Fecha: 06-03-2019
  * Descripcion: Method Configuracion Inicial del Mapa of the Class
  * Objetivo: onMapReady in the method header API
  ****************************************************************************/
  onMapReady(map: L.Map) {
    map.doubleClickZoom.disable();

    map.on('popupopen', function (e) {
      // console.log('prueba' + e.latlng);
    });

    map.on('click', function (event) {
      // Coordenadas Geograficas capturadas
      // const lat: number = event.latlng.lat;
      // const lng: number = event.latlng.lng;

      // create popup contents
      // const customPopup = '<div> ' +
      //   '<form> <h4> Ingreso de Localidad </h4> <hr> <input class="form-control" type = "text" placeholder = "Nombre de Localidad" class= "form-control" /> <br> ' +
      //   '<textarea class="form-control" type = "text" placeholder = "Descripción de Localidad" class= "form-control"></textarea> </form>  ' +
      //   '<hr> <p><strong>Latitud: </strong>' + ' ' + lat + ' <strong>Longitud: </strong>' + lng + ' </p>' +
      //   ' <button class="btn btn-primary botonSave with-margins" onclick="this.saveLocalidad()" > Guardar</button> </div>';

      // specify popup options
      const customOptions = {
        'maxWidth': 400,
        'width': 200,
      }

      // Crea el Nuevo marcador
      // this.marker1 = new L.Marker([lat, lng], {
      //   icon: icon({
      //     iconUrl: 'assets/icons/forms/map_24.png',
      //     shadowUrl: 'assets/icons/forms/map_24.png',
      //   }),
      // draggable: true,
      // });
      map.addLayer(this.marker1);

      // Despliega el PopUp de Localidad
      // this.marker1.bindPopup(customPopup, customOptions);
    });

    // Remover marcadores del Mapa
    map.on('dblclick', function (event) {
      // map.removeLayer(this);
      // Coordenadas Geograficas capturadas
      // const lat: number = event.latlng.lat;
      // const lng: number = event.latlng.lng;

      // const marka = marker([lat, lng]);
      // console.log('Coordenadas a Borrar ' + this.marker1);
      // map.removeLayer(marka)
    });
  } // FIN onMapReady
}
