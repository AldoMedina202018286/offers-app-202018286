import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OffersDataService} from "../../services/offers-data.service";
import {Offer} from "../../models/offer";
import {MatTableDataSource} from "@angular/material/table";
import * as _ from "lodash";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent {
  offerData!: Offer;
  dataSource = new MatTableDataSource();

  isEditMode = false;
  @ViewChild('offerForm', {static: false}) offerForm!: NgForm;

  constructor(
    private offersDataService: OffersDataService,
    private snackBar: MatSnackBar
  )
  {
    this.offerData = { } as Offer;
  }

  ngOnInit(): void {
    this.getAllOffers();
  }

  onSubmit() {
    if (this.offerForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        //this.updateOffer();
      }
      else {
        console.log('about to create');
        //this.addOffer();
      }
      this.cancelEditOffer();
    }
    else {
      console.log('Invalid data');
    }
  }

  getAllOffers() {
    this.offersDataService.getItemList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  addOffer() {
    this.offerData.id = 0;
    this.offersDataService.createItem(this.offerData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o})
    })

    this.snackBar.open('Offer added successfully!', 'Close',
      {
        duration: 3000,
      });
  }

  updateOffer() {
    this.offersDataService.updateItem(this.offerData.id, this.offerData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id == response.id) {
          o = response;
        }
        return 0;
      })
    })
  }

  editOffer(element: any) {
    this.offerData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEditOffer() {
    this.isEditMode = false;
    this.offerForm.resetForm();
  }
}
