import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUrls, actionUrl } from 'src/environments/app-urls';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {
  constructor(private http: HttpClient) {}

  // Example: getOrderSummary(orderId: string) { return this.http.get<any>(`api/orders/${orderId}`); }

  getOrderSummary(selectedData: string) {
    console.log(this.http.get<any>(`${AppUrls._baseUrl}${actionUrl._getOrderById}${selectedData}`));
    return this.http.get<any>(`${AppUrls._baseUrl}${actionUrl._getOrderById}${selectedData}`);
  }

  // Add other methods for interacting with your API based on your requirements

}