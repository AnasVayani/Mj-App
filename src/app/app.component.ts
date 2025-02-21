import { Component, OnInit } from '@angular/core';
import { commonService } from 'src/app/services/commonService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mj-app';

  constructor(private commonService: commonService){
    
  }
  ngOnInit(): void {
    this.commonService.getProducts(1, 1).subscribe({
      next: (res) => {
        console.log('Products:', res);
      },
      error: (err) => {
        console.error('Error calling products:', err);
      }
    });
  }
}
