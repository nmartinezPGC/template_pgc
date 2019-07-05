import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'ngx-recursos-proyecto',
  templateUrl: './recursos-proyecto.component.html',
  styleUrls: ['./recursos-proyecto.component.scss'],
})
export class RecursosProyectoComponent implements OnInit {
   // Variables entre Tabs | Components
   @Input() idProyectoTab: number;
   @Input() idUsuarioTab: number;
   @Input() codigoProyectoTab: string;
   // variable del Json
   @Input() JsonPassData: any;
  public uploadedFiles: any;
  public msgs: any;
  constructor() { }

  ngOnInit() {
  }

  Upload(event) {

  }

}
