import { Component,signal } from '@angular/core';
import { Productservice } from '../services/productservice';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-prodcatalog',
  imports: [Footer],
  templateUrl: './prodcatalog.html',
  styleUrl: './prodcatalog.scss'
})
export class Prodcatalog {

  message = signal('');
  page: number = 1;
  totpage: any;
  products: any;

  constructor(
    private productsService: Productservice
  ) { 
    this.productList(this.page);
  }


  productList(page: any) {
    this.productsService.sendProductRequest(page).subscribe({
      next: (res: any) => {
      this.totpage = res.totpage;
      this.products = res.products;
      },
      error: (err: any) => {
        this.message.set(err.error.message);
        window.setTimeout(() => {
          this.message.set('');
        }, 3000);

      }

    })
  }

  lastPage(event: any) {
    event.preventDefault();    
    this.page = this.totpage;
    this.productList(this.page);
    return;    
  }

  nextPage(event: any) {
    event.preventDefault();    
    if (this.page == this.totpage) {
      return;
    }
    this.page = this.page + 1;
    this.productList(this.page);
    return;    
  }

  prevPage(event: any) {
    event.preventDefault();    
    if (this.page == 1) {
      return;
    }
    this.page = this.page - 1;
    this.productList(this.page);
    return;    

  }

  firstPage(event: any) {
    event.preventDefault();    
    this.page = 1;
    this.productList(this.page);
    return;    
  }  

  toDecimal(nos: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(nos);
  }


}
