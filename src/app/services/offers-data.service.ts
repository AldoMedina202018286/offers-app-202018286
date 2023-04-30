import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Offer} from "../models/offer";

@Injectable({
  providedIn: 'root'
})
export class OffersDataService {
  baseURL = "http://localhost:3000/offers";

  constructor(private http: HttpClient) { }

  //http options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //http API Errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  createItem(item: any): Observable<Offer> {
    return this.http.post<Offer>(this.baseURL, JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  getItemList(): Observable<Offer> {
    return this.http.get<Offer>(this.baseURL).pipe(retry(2), catchError(this.handleError));
  }

  getItemById(id: string): Observable<Offer> {
    return this.http.get<Offer>(this.baseURL + '/' + id).pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id: string, item: any): Observable<Offer> {
    return this.http.put<Offer>(this.baseURL + '/' + id, JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: string): Observable<Offer> {
    return this.http.delete<Offer>(`${this.baseURL}/${id}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
}
