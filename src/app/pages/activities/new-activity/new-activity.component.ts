import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss'],
})
export class NewActivityComponent implements OnInit {

  constructor( private userService: UserService ) { }

  ngOnInit() {
    // console.log(this.userService.getIdentity().userName);

  this.userService.getUserDetails(this.userService.getIdentity().userName).subscribe(
      result => {

        if (result.code !== 200) {
          // console.log(result.data);
        } else {
          // this.productos = result.data;
        }
      },
      error => {
        // console.log(error);
        // console.log(<any>error);
      },
    );
  }

}
