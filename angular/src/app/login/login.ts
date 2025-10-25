import { Component, OnInit, signal } from '@angular/core';
import { Mfa } from "../mfa/mfa";
import { Loginservice } from '../services/loginservice';
import { SessionStorage } from '../services/session-storage';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import jQuery from 'jquery';

@Component({
  selector: 'app-login',
  imports: [Mfa, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login implements OnInit{
  loginMessage = signal('');
  isDisabled: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(
    private loginService: Loginservice,
    private sessionStorageService: SessionStorage
  ) { }

  ngOnInit(): void {
  }

  submitLoginForm() {
    if(this.loginForm.valid)
    {
       this.loginMessage.set('please wait...');
       this.isDisabled = true;
       this.loginService.sendLoginRequest(this.loginForm.value).subscribe({
         next: (res: any) => {
            if (res.isactivated == 0) {
              this.loginMessage.set('Please activate your account first.')
              setTimeout(() => {
                this.loginMessage.set('')
                this.isDisabled = false;
              }, 3000);  
              return;
            }
            if (res.isblocked === '1') {
              this.loginMessage.set('You Account has been blocked.')
              setTimeout(() => {
                this.loginMessage.set('')
                this.isDisabled = false;
              }, 3000);  
              return;
            }


            this.loginMessage.set(res.message);

            this.sessionStorageService.setItem("USERID", res.id);
            this.sessionStorageService.setItem("TOKEN", res.token);
            this.sessionStorageService.setItem("USERPIC", res.profilepic);

            if (res.qrcodeurl !== null) {
              this.isDisabled = false;
              jQuery("#loginClose").trigger('click')
              jQuery("#mfashow").trigger('click');
              return;
            } else {
              this.sessionStorageService.setItem("USERNAME", res.username);  
              setTimeout(() => {
                this.loginMessage.set('');
                jQuery("#loginClose").trigger('click')
                location.reload();
              }, 6000);
            }
          },
          error: (err: any) => {
            this.loginMessage.set(err.error.message);
            setTimeout(() => {
              this.loginMessage.set('');
              this.isDisabled = false;
            }, 3000);

          }

      });
    }
  }  

  closeLogin() {
    jQuery("#reset").trigger('click');
  }

}
