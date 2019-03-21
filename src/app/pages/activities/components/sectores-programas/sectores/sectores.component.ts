import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Tree, TreeNode, MessageService, MenuItem } from 'primeng/primeng';
import { ServiceSectoresService } from '../../../services/service-sectores.service';

@Component({
  selector: 'ngx-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.scss'],
  providers: [ServiceSectoresService, MessageService],
})
export class SectoresComponent implements OnInit, OnChanges {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;
  @Input() idUsuarioTab: number;
  @Input() codigoProyectoTab: string;

  // variable del Json
  @Input() JsonPassData: any;

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

  /**
   * Configuracion del Dropdow List
   */
  dropdownList = [];
  dropdownListPais = [];
  dropdownListEspacioTrabajo = [];
  selectedItems = [];
  selectedItemsPais = [];
  selectedItemsEspacioTrabajo = [];
  dropdownSettings = {};

  // Propieades de los Nodos del Tree
  filesTree4: TreeNode[];
  selectedFiles2: TreeNode[];
  items: MenuItem[];
  selectedFile2: TreeNode;


  constructor(private _serviceSectoresService: ServiceSectoresService,
    private messageService: MessageService) { }

  nodeSelect(event) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    // console.log(event.node.label );
  }

  nodeUnselect(event) {
    this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }

  /**
   * Inicializacion de la Clase
   */
  ngOnInit() {
    this.dropdownList = [
      { 'id': 1, 'itemName': 'India', 'category': 'asia' },
      { 'id': 2, 'itemName': 'Singapore', 'category': 'asia pacific' },
      { 'id': 3, 'itemName': 'Germany', 'category': 'Europe' },
      { 'id': 4, 'itemName': 'France', 'category': 'Europe' },
      { 'id': 5, 'itemName': 'South Korea', 'category': 'asia' },
      { 'id': 6, 'itemName': 'Sweden', 'category': 'Europe' },
    ];

    this.items = [
      { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFile(this.selectedFile2) },
      { label: 'Unselect', icon: 'fa fa-close', command: (event) => this.unselectFile() },
    ];

    // Llenado del Treeview de la Tabla
    this._serviceSectoresService.getFiles().then(files => this.filesTree4 = files);

    // Configuracion del Muliteselect
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Seleccione una Opción',
      enableSearchFilter: true,
      searchPlaceholderText: 'Buscar Elemento',
      classes: 'comboSea',
      showCheckbox: false,
      lazyLoading: false,
      groupBy: 'category',
      // selectGroup: true,
    };
  }

  viewFile(file: TreeNode) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected with Right Click', detail: file.label });
  }

  unselectFile() {
    this.selectedFile2 = null;
  }

}
