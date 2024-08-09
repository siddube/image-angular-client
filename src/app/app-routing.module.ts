// import NgModule from Angular Core
import { NgModule } from '@angular/core';
// import Router and Routes Module from Angular Router
import { RouterModule, Routes } from '@angular/router';

// import Info and Main custom components
import { InfoComponent } from './info/info.component';
import { MainComponent } from './main/main.component';

// decalre Routes
// use InfoComponent for root / route
// use MainComponent for /app route
const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'app', component: MainComponent },
];

// NgModule decorator declaration
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// export AppRouting Module
export class AppRoutingModule { }
