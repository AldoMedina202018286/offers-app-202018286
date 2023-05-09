import { Component } from '@angular/core';
import {Offer} from "../../models/offer";
import {OffersDataService} from "../../services/offers-data.service";

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent {
  offerData: Offer[] = [];

  constructor(private offersDataService: OffersDataService) { }

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    this.offersDataService.getItemList().subscribe((response: any) => {
      this.offerData = response;
    })
  }

  deleteOffer(id: any) {
    this.offersDataService.deleteItem(id).subscribe((response: any) => {
      this.offerData = this.offerData.filter((o: any) => {
        return o.id !== id ? o : false;
      })
    })
  }
}
