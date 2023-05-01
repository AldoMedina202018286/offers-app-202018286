import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {OffersTableComponent} from "./components/offers-table/offers-table.component";
import {AddOfferDialogComponent} from "./components/add-offer-dialog/add-offer-dialog.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: OffersTableComponent },
  { path: 'admin/offers/new', component: AddOfferDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
