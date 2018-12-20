import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-mant-seguridad',
  templateUrl: './mant-seguridad.component.html',
  styleUrls: ['./mant-seguridad.component.scss'],
})
export class MantSeguridadComponent implements OnInit {

  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
  }

  // ngOnDestroy() {
  //   this.themeSubscription.unsubscribe();
  // }

}
