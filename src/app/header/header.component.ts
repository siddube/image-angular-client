/* ==========================================
Header Component - header.component.ts
Selector: 'app-header'
Template: 'header.component.html
Style: 'header.component.css
============================================= */

// import Component and Router from Angular Core & Router
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// component decorator
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

// declare HeaderComponent class
export class HeaderComponent {

  // component properties
  // currentRoute property
  currentRoute: string = '';;

  // class constructor
  // inject router dependency
  // set currentRoute property
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

}
