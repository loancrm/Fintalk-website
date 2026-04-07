import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OtpResponse {
  success?: boolean;
  message?: string;
  error?: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  // private BASE_URL = 'http://localhost:5002/';
  // private BASE_URL = 'https://rest.thefintalk.in:5002/';
  private BASE_URL = 'https://api.myloancrm.com/app/';


  constructor(private http: HttpClient) {}
  createEnquiry(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries', data);
  }
  subscribeUser(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries/newsletter', data);
  }
  createContactRequests(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries/contact-requests', data);
  }
   sendMobileOtp(mobile: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      this.BASE_URL + 'enquiries/send-otp',
      { mobile }
    );
  }

  verifyMobileOtp(mobile: string, otp: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      this.BASE_URL + 'enquiries/verify-otp',
      { mobile, otp }
    );
  }
  sendOtp(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries/send-otp', data);
  }
  verifyOtp(data: any) {
    return this.http.post(this.BASE_URL + 'enquiries/verify-otp', data);
  }
}
