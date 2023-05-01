import { Component } from '@angular/core';
import {OffersDataService} from "../../services/offers-data.service";
import {MatTableDataSource} from "@angular/material/table";
import {Offer} from "../../models/offer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  dataSource = new MatTableDataSource();

  constructor(private offersDataService: OffersDataService) {
  }

  ngOnInit(): void {
    this.getAllOffers();
  }

  getAllOffers() {
    this.offersDataService.getItemList().subscribe((response: any) => {
      this.dataSource.data = response;
      this.totalOffers = this.dataSource.data.length;
    })
  }
  totalOffers: any = 0;
}
