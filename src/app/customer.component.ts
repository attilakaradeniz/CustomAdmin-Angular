import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customers } from './types';

@Component({
  selector: 'app-customer',
  template: `

<h1>Customer Admin</h1>
<app-customer-list #listok (select)="selectCustomer($event)"></app-customer-list>
<app-customer-input [customer]="selectedCustomer" (ok)="listok.refresh()"></app-customer-input>


  `,
  styles: [
  ]
})
export class CustomerComponent  {
  selectedCustomer: Customers;

  constructor(private customerService: CustomerService) {}

  selectCustomer(id: number) {
    if(id) {
      // edit => retrieve customer using customer service
      this.customerService.retrieve(id)
        .then(customer => this.selectedCustomer = customer);
    } else {
      // add => create new customer object
      this.selectedCustomer = new Customers();
    }

  }


}
