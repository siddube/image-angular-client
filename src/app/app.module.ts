/* ==============================================================
App Module Class - Responsible for seting up the Angular project
================================================================= */

// import Angular Core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

// import Angular-Routing module
import { AppRoutingModule } from './app-routing.module';

// import Custom Angular components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// @ngmodule decorator
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

// export class
export class AppModule { }
