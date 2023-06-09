import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Offer} from "../../models/offer";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OffersDataService} from "../../services/offers-data.service";
import * as _ from "lodash";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-offers-table',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.css']
})
export class OffersTableComponent {

  offerData!: Offer;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'description', 'points', 'businessId', 'actions']

  isEditMode = false;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('offerForm', {static: false}) offerForm!: NgForm;

  constructor(
    private offersDataService: OffersDataService,
    private snackBar: MatSnackBar
  )
  {
    this.offerData = { } as Offer;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllOffers();
  }

  getAllOffers() {
    this.offersDataService.getItemList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
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

  deleteOffer(id: string) {
    this.offersDataService.deleteItem(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      })
    })
    console.log(this.dataSource.data)

    this.snackBar.open('Offer deleted successfully!', 'Close',
      {
        duration: 3000,
      });
  }
}
