import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interface/user';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Loginservice {
 
    private http = inject(HttpClient);
    private apiUrl = "http://localhost:8000/api/login";

  public sendLoginRequest(userdtls: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'jwt-token'
      })
    };
      return this.http.post<User>(this.apiUrl ,userdtls, options);
  };
  
}
