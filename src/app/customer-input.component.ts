import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customers } from './types';

@Component({
  selector: 'app-customer-input',
  template: `
<div align="center">
  <div *ngIf="customer">

  <h2>{{ customer.id ? 'Edit Customer' : 'Add Customer' }}</h2>
  <p *ngIf="customer.id">
  <label for="id">ID:</label>
  <input type="number" [value]="customer.id" id="id" readonly>
  </p>

  <p>
    <label for="vorname">Name:</label>
    <!-- <input [(ngModel)]="customer.name" id="name"> --> <!-- NOT WORKING-->
    <input [(ngModel)]="customer.vorname" id="vorname">
  </p>

  <p>
    <label for="surname">Surname:</label>
    <!-- <input [(ngModel)]="customer.surname" id="surname"> --> <!-- NOT WORKING-->
    <input [(ngModel)]="customer.nachname" id="surname">
  </p>

  <p>
    <label for="customer">Birthday:</label>
    <!-- <input [(ngModel)]="customer.birthday" id="birthday"> --> <!-- NOT WORKING-->
    <input [(ngModel)]="customer.geburtsdatum" id="birthday">
  </p>

  <p>
    <label for="customer">Active:</label>
    <!-- <input [(ngModel)]="customer.birthday" id="birthday"> --> <!-- NOT WORKING-->
    <input type="checkbox" [(ngModel)]="customer.aktiv" id="active">
  </p>

  <button (click)="finishWithOK()">OK</button>
  <button (click)="finishWithCancel()">Cancel</button>
  </div>
  </div>
  `,
  styles: [`
  button {
    margin: 25px;
    color: red;
  }
  `
  ]
})
export class CustomerInputComponent  {
 @Input() customer: Customers;
 @Output() ok = new EventEmitter();
 @Output() cancel = new EventEmitter();

  constructor(private customerService: CustomerService) {}

  finishWithOK(): void {
    this.createOrUpdate()
      .then(
        () => {
          this.ok.emit();
          this.customer = null;
        }
      );
  }

  createOrUpdate(): Promise<any> {
    if(this.customer.id) {
      // edit => update customer
      return this.customerService.update(this.customer);
    }
    else {
      // add => create customer
      return this.customerService.create(this.customer);
    }
  }

  finishWithCancel(): void {
    this.cancel.emit();
    this.customer = null;
  }

}
