import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customers } from './types';

const CUSTOMERS_RESOURCE_URL = 'http://localhost:8080/resources/kunden';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  create(customer: Customers): Promise<any> {
    return this.httpClient.post(CUSTOMERS_RESOURCE_URL, customer).toPromise();
  }

  retrieve(id: number): Promise<Customers> {
    return this.httpClient.get<Customers>(CUSTOMERS_RESOURCE_URL + '/' + id).toPromise();
  }

  update(customer: Customers): Promise<any> {
    return this.httpClient.put(CUSTOMERS_RESOURCE_URL + '/' + customer.id, customer).toPromise();
  }

  delete(id: number): Promise<any> {
    return this.httpClient.delete(CUSTOMERS_RESOURCE_URL + '/' + id).toPromise();
  }

  retrieveAll(): Promise<Customers[]> {
    return this.httpClient.get<Customers[]>(CUSTOMERS_RESOURCE_URL).toPromise();

  }




}
