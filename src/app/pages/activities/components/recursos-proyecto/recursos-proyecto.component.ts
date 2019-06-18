import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'ngx-recursos-proyecto',
  templateUrl: './recursos-proyecto.component.html',
  styleUrls: ['./recursos-proyecto.component.scss'],
})
export class RecursosProyectoComponent implements OnInit, OnChanges {
   // Variables entre Tabs | Components
   @Input() idProyectoTab: number;
   @Input() idUsuarioTab: number;
   @Input() codigoProyectoTab: string;
   // variable del Json
   @Input() JsonPassData: any;
  public uploadedFiles: any;
  public msgs: any;
  ngOnChanges(changes) {
    if (changes['idProyectoTab']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.idProyectoTab;
    }

    if (changes['idUsuarioTab']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.idUsuarioTab;
    }

    if (changes['codigoProyectoTab']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.idUsuarioTab;
    }

    if (changes['JsonPassData']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.JsonPassData;
    }
  }
  constructor() { }

  ngOnInit() {
  }

  Upload(event) {

  }

}
