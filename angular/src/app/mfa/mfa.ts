import { Component,OnInit ,signal} from '@angular/core';
import { Mfaservice } from '../services/mfaservice';
import { SessionStorage } from '../services/session-storage';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import jQuery from 'jquery';

@Component({
  selector: 'app-mfa',
  imports: [ReactiveFormsModule],
  templateUrl: './mfa.html',
  styleUrl: './mfa.scss'
})

export class Mfa {
  message = signal('');
  isDisabled: boolean = false;
  userId: any = '';

  constructor(
    private mfaService: Mfaservice,
    private sessionStorageService: SessionStorage
  ) { 
    const uid = this.sessionStorageService.getItem('USERID');
    if (uid) {
      this.userId = uid;
    }
  }

  mfaForm = new FormGroup({
    otpcode: new FormControl('', [Validators.required]),
  });

  submitMfaForm() {
    if(this.mfaForm.valid)
    {
       this.message.set('please wait...');
       const formData = {
        'id': this.userId,
        'otp': this.mfaForm.get('otpcode')?.value
       }
       this.mfaService.sendMfaValidation(formData).subscribe({
         next: (res: any) => {
          
              this.message.set(res.message);
              this.sessionStorageService.setItem("USERNAME", res.username);  
              setTimeout(() => {
                this.message.set('');
                jQuery("#reset").trigger('click')
                location.reload();
              }, 6000);
            
          },
          error: (err: any) => {
            this.message.set(err.error.message);
            setTimeout(() => {
              jQuery("#reset").trigger('click')
              this.message.set('');
              this.isDisabled = false;
            }, 3000);
            return;
          }
      });
    
    }
  }    

  closeMfa() {
    jQuery("#reset").trigger('click');
  }

}
