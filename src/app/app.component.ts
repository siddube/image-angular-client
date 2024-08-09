/* ==========================================
App Component - app.component.ts
Selector: 'app-root'
Template: 'app.component.html
Style: 'app.component.css
============================================= */

// import Component from Angular Core
import { Component } from '@angular/core';

// component decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// export component
export class AppComponent {
  title = 'angular-client';
}
