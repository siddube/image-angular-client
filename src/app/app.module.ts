/* ==============================================================
App Module Class - Responsible for seting up the Angular project
================================================================= */

// import Angular Core and Browser modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import Angular Forms module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import Http Client Module
import { HttpClientModule } from '@angular/common/http';

// import Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

// import Angular-Routing module
import { AppRoutingModule } from './app-routing.module';

// import Custom Angular components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InfoComponent } from './info/info.component';
import { MainComponent } from './main/main.component';

// @ngmodule decorator
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

// export class
export class AppModule { }
