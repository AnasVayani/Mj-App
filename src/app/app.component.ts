import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mj-app';

  constructor(private CommonService: CommonService){
    
  }
  ngOnInit(): void {
    this.CommonService.getProducts(1, 1, 1, 1).subscribe({
      next: (res: any) => {
        console.log('Products:', res);
      },
      error: (err: any) => {
        console.error('Error calling products:', err);
      }
    });
  }
}
