import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customers } from './types';


@Component({
  selector: 'app-customer-list',
  template: `
<div align="center">
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>NAME</th>
      <th>SURNAME</th>
      <th>ACTIVE</th>
      <th><button (click)="addCustomer()"> ADD CUSTOMER </button></th>
    </tr>
  </thead>
    <tbody>
      <tr *ngFor="let customer of customerList">
      <td>{{ customer.id }}</td>
      <td> {{ customer.vorname }} </td>
      <td> {{ customer.nachname }} </td>

      <td> {{ customer.aktiv}} </td>
      <td>
  <button (click)="editCustomer(customer)"><img src="assets/edit_white_background.png"></button>
  <button (click)="deleteCustomer(customer)"><img src="assets/delete_white_background.png"></button>
      </td>

      </tr>
    </tbody>
</table>
</div>
  `,
  styles: [`
  th, td {
    align: center;
    border: 1px solid blue;
    padding: 3px;
  }
  img {
    margin: 6px;
    padding: 3px;
  }

  `
  ]
})
export class CustomerListComponent implements OnInit {
   @Output() select = new EventEmitter<number>();
   customerList: Customers[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
      this.refresh();
  }

  refresh(): void {
    this.customerService.retrieveAll()
    .then(customerList => this.customerList = customerList);
  }


  addCustomer(): void {
       this.select.emit();
  }

  editCustomer(customer: Customers): void {
    this.select.emit(customer.id);
  }

  deleteCustomer(customer: Customers): void {
     if(confirm('Do you really want to delete this customer?')) {
       this.customerService.delete(customer.id)
        .then(() => this.refresh());
     }
  }
}
