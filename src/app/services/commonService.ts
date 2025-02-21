import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class commonService {
  constructor(private httpclient: HttpClient) {}

  getProducts(categoryId: number,  type: number,  name: String = "",  hashTag: String = "",  fromPrice: number = 0,  toPrice: number = 0): Observable<any>{
    return this.httpclient.get<any>(`${environment.apiUrl}/Product/GetProducts`)
  }
}
