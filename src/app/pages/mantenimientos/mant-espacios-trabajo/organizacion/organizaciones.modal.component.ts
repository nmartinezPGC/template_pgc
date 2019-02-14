import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-organizacion',
  templateUrl: './organizaciones.modal.component.html',
   styleUrls: ['./organizaciones.modal.component.scss'],
  // providers: [NgbActiveModal]
})
export class OrganizacionModalComponent implements OnInit {

 constructor(private activeModal: NgbActiveModal ) { }

 closeModal() {
   this.activeModal.close();
 }

  ngOnInit() {
  }

}
