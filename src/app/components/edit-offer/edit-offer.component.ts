import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersDataService } from '../../services/offers-data.service';
import { Offer } from '../../models/offer';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  offerData !: Offer;
  dataSource = new MatTableDataSource();

  isEditMode = false;
  @ViewChild('offerForm', {static: false}) offerForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private offersDataService: OffersDataService,
    private snackBar: MatSnackBar
  ) {
    this.offerData = { } as Offer;
  }

  ngOnInit() {
    this.getOfferById();
    const id = this.route.snapshot.params['id'];
    this.offersDataService.getItemById(id).subscribe((response: Offer) => {
      this.offerData = response;
    });
  }

  getOfferById() {
    this.offersDataService.getItemById(this.route.snapshot.params['id']).subscribe((response: any) => {
      this.dataSource.data = response;
    })
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

  updateOffer() {
    this.offersDataService.updateItem(this.offerData.id, this.offerData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id == response.id) {
          o = response;
        }
        return 0;
      })
    })

    this.snackBar.open('Offer updated successfully!', 'Close',
      {
        duration: 3000,
      });
  }

  cancelEditOffer() {
    this.isEditMode = false;
    this.offerForm.resetForm();
  }
}
