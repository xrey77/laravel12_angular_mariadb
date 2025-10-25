import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { SessionStorage } from '../services/session-storage';
import { Login } from "../login/login";
import { Register } from "../register/register";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLinkWithHref, Login, Register],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss'
})

export class NavMenu implements OnInit {

   userName: string = '';
   profilepic: string = '';
  
  constructor(
    private sessionStorageService: SessionStorage
    ) { 
    }
  
    ngOnInit(): void {
        try {
        const uname = this.sessionStorageService.getItem('USERNAME');
        if (uname) {
          this.userName = uname;
        }
      } catch(error) {}

      try {
        const userpic = this.sessionStorageService.getItem('USERPIC');
        if (userpic) {
          this.profilepic = userpic;
        }
      } catch(error) {}
    }
  
  
  logOut(){
    this.sessionStorageService.removeItem('USERNAME');
    this.sessionStorageService.removeItem('USERPIC');
    this.sessionStorageService.removeItem('USERID');
    this.sessionStorageService.removeItem('TOKEN');
    this.sessionStorageService.clear();
    location.reload();
  }


}
