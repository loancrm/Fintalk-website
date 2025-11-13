import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  // private BASE_URL = 'http://localhost:5002/';
  private BASE_URL = 'https://rest.thefintalk.in:5002/';

  constructor(private http: HttpClient) { }
  createEnquiry(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries', data);
  }
  subscribeUser(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries/newsletter', data);
  }
  createContactRequests(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries/contact-requests', data);
  }
}
