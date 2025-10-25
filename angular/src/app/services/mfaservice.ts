import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Mfaservice {
  private http = inject(HttpClient);

public sendMfaValidation(userdtls: any): Observable<any> {

  const options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
    return this.http.patch("http://localhost:8000/api/otpvalidation" ,userdtls, options);
};
  
}
