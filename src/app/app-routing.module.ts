import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {OffersTableComponent} from "./components/offers-table/offers-table.component";
import {NewOfferComponent} from "./components/new-offer/new-offer.component";
import {EditOfferComponent} from "./components/edit-offer/edit-offer.component";
import {ViewOfferComponent} from "./components/view-offer/view-offer.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: OffersTableComponent },
  { path: 'admin/offers/new', component: NewOfferComponent },
  { path: 'admin/offers/edit/:id', component: EditOfferComponent },
  { path: 'admin/offers/view', component: ViewOfferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
