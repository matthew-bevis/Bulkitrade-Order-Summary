import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderSummaryService } from './order-summary.service';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryResolver implements Resolve<any> {
  constructor(private orderSummaryService: OrderSummaryService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // Extract the 'selectedData' parameter from the route
    const selectedData = route.params['selectedData'];

    // Use the OrderSummaryService to fetch the data based on 'selectedData'
    const orderSummaryData = this.orderSummaryService.getOrderSummary(selectedData);

    // Return an object containing orderId and resolved data
    return { orderId: selectedData, data: orderSummaryData };
  }
}