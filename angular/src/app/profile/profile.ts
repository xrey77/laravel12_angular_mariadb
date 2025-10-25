import { Component, NgZone, ChangeDetectorRef, OnInit,signal } from '@angular/core';
import { Profileservice } from '../services/profileservice';
import { SessionStorage } from '../services/session-storage';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import jQuery from 'jquery';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule,Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})

export class Profile implements OnInit  {  
  profileMsg = signal('');

  passwordChangeForm = new FormGroup({
    newpassword: new FormControl('', Validators.required),
    confnewpassword: new FormControl('', [Validators.required])
  });

  profileForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required)
  });



  profileData: any;
  userId: any;
  jwttoken: any;
  enableMfa: any = [];
  mfa: boolean = false;
  profilepic: string = '';
  email: string = '';
  qrcodeurl: any = null;
  userpic: string = '';
  showSave: boolean = false;

  constructor(
    private profileService: Profileservice,
    private sessionStorageSevice: SessionStorage,
    private ngZone: NgZone, 
    private cdRef: ChangeDetectorRef    
  ) 
  {

    const uid = this.sessionStorageSevice.getItem('USERID');
    if (uid) {
     this.userId = uid;
    }

    const jwt = this.sessionStorageSevice.getItem('TOKEN');
    if (jwt) {
     this.jwttoken = jwt;
    }
    this.profileService.getUserbyId(this.userId, this.jwttoken).subscribe({
     next: (res: any) => {
           this.profileMsg.set(res.message);
           const formData = {
             firstname: res.user.firstname,
             lastname: res.user.lastname,
             mobile: res.user.mobile
            }
            this.profileForm.setValue(formData);
            jQuery("#email").val(res.user.email);
            this.profilepic = res.user.profilepic;
            sessionStorage.setItem("USERPIC", res.user.profilepic);
            if (res.user.qrcodeurl != null) {
             const img = new Image();
             img.src = res.user.qrcodeurl;
             this.mfa = true;
             this.qrcodeurl = img.src;
            } else {
             this.mfa = false;
            }
            setTimeout(() => {
              this.profileMsg.set('');
            }, 3000);
   
       },
       error: (err: any) => {
         this.profileMsg.set(err.error.message);
         setTimeout(() => {
           this.profileMsg.set('');
         }, 3000);

       }
    });        
  }

  ngOnInit(): void {
    jQuery("#cpwd").hide();
    jQuery("#mfa1").hide();
    jQuery("#mfa2").hide();  
  }

  changeProfilepic(event: any) {
    jQuery("#pix").attr('src',URL.createObjectURL(event.target.files[0]));
    
    const formdata = new FormData();
    formdata.append('id', this.userId);
    formdata.append('profilepic',event.target.files[0]);

    this.profileService.UploadPicture(formdata, this.jwttoken).subscribe({
      next: (res: any) => {
        this.profileMsg.set(res.message);
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: any) => {

          this.profileMsg.set(err.error.message);
          setTimeout(() => {
            this.profileMsg.set('');
          }, 3000);

      }

    });    
  }

  changePassword() {
    if (jQuery('#changepwd').is(":checked")) {
      this.showSave = true;
      jQuery("#cpwd").show();
      jQuery("#mfa1").hide();  
      jQuery("#mfa2").hide();  
      jQuery('#twofactor').prop('checked', false);
    } else {
      this.showSave = false;
      jQuery("#cpwd").hide();
    }            
  }

  onetimePassword() {
    if (jQuery('#twofactor').is(":checked")) {
      this.showSave = true;
      jQuery("#cpwd").hide();
      jQuery("#mfa1").show();
      jQuery("#mfa2").show();
      jQuery('#changepwd').prop('checked', false);
    } else {
      jQuery("#mfa1").hide();  
      jQuery("#mfa2").hide();  
      this.showSave = false;
    }            
  }

  passwordChange() {
    this.ngZone.run(() => {
      if (this.passwordChangeForm.get('newpassword')?.value === '') {
        this.profileMsg.set('Please enter New password...')
        setTimeout(() => {
          this.profileMsg.set('');
        }, 3000)
        return;
      }

      if (this.passwordChangeForm.get('confnewpassword')?.value === '') {
        this.profileMsg.set('Please confirm New password...')
        setTimeout(() => {
          this.profileMsg.set('');
        }, 3000)
        return;
      }

      if (this.passwordChangeForm.get('newpassword')?.value != this.passwordChangeForm.get('confnewpassword')?.value) {
        this.profileMsg.set('New password does not mactched...')
        setTimeout(() => {
          this.profileMsg.set('');
        }, 3000)
        return;
      }
      const formData = {
        'password': this.passwordChangeForm.get('newpassword')?.value
      }
      
      this.profileService.sendNewpasswordRequest(this.userId, formData, this.jwttoken).subscribe({
        next: (res: any) => {

          this.profileMsg.set(res.message);
          setTimeout(() => {
            this.profileMsg.set('');
            location.reload();
          }, 3000);

      },
      error: (err: any) => {
        this.profileMsg.set(err.error.message);
        setTimeout(() => {
          this.profileMsg.set('');
        }, 3000);

      }

    });      

    }); //END-ngZone
  }

  enableMFA(event: any) {
    event.preventDefault();    
    this.enableMfa = {
      Twofactorenabled: true
    }

    this.profileService.ActivateMFA(this.userId, this.enableMfa, this.jwttoken).subscribe({
      next: (res: any) => {
        
          this.profileMsg.set(res.message);
          setTimeout(() => {
            this.profileMsg.set('');
            this.mfa = true;
            this.qrcodeurl = res.qrcodeurl;
          }, 3000);

        },
        error: (err: any) => {

          this.profileMsg.set(err.error.message);
          setTimeout(() => {
            this.profileMsg.set('');
            this.qrcodeurl = null;
          }, 3000);
  
        }  
    });
  }

  disableMFA(event: any) {
    event.preventDefault();      
    this.enableMfa = {
      Twofactorenabled: false
    }

    this.profileService.ActivateMFA(this.userId, this.enableMfa, this.jwttoken).subscribe({
      next: (res: any) => {

        this.profileMsg.set(res.message);
        this.qrcodeurl = '/images/qrcode.png';

      },
      error: (err: any) => {

        this.profileMsg.set(err.error.message);
        setTimeout(() => {
          this.profileMsg.set('');
        }, 3000);

      }

    });
    setTimeout(() => {
      this.profileMsg.set('');
    }, 3000);

  }

  submitProfileForm() {
    this.ngZone.run(() => {
        this.profileService.sendProfileRequest(this.userId, this.profileForm.value, this.jwttoken).subscribe({
          next: (res: any) => {

            this.profileMsg = res.message;
            setTimeout(() => {
              this.profileMsg.set('');
              location.reload();
            }, 3000);

          },
          error: (err: any) => {
            this.profileMsg.set(err.error.message);
            setTimeout(() => {
              this.profileMsg.set('');
            }, 3000);

          }
          
      });      
    });
  }  


}
