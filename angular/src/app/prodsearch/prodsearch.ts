import { Component, signal } from '@angular/core';
import { Productservice } from '../services/productservice';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-prodsearch',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './prodsearch.html',
  styleUrl: './prodsearch.scss'
})

export class Prodsearch {
  message = signal('');
  products: any;
  totalrec: any;

  productsearchForm = new FormGroup({
    searchkey: new FormControl('', [Validators.required]),
  });


  constructor(
    private productsService: Productservice
  ) { }

  submitSearchForm() {
    
    if (this.productsearchForm.valid) {
      const formData = {
        search: this.productsearchForm.get('searchkey')?.value
      }
      this.productsService.sendSearchRequest(formData).subscribe({
        next: (res: any) => {
          this.products = res.products;
          this.totalrec = res.products.length;
        },
        error: (err: any) => {
          this.message.set(err.error.message);
          window.setTimeout(() => {
            this.message.set('');
          }, 3000);
 
        }
 
      })
    }
  }
  toDecimal(nos: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(nos);
  }


}
