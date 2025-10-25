import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})

export class Registerservice {
  
  constructor(
    private httpclient: HttpClient
  ) { }
  
  public sendRegistrationRequest(userdtls: any): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpclient.post<User>("http://localhost:8000/api/register",userdtls, option);
  }    

}
