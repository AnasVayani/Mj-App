import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Category/GetAll`);
  }

  getMenProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetMenProducts`);
  }

  getWomenProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetWomenProducts`);
  }


  getBanner(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetProductBanner`);
  }

  getBestSeller(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetBestSellingProducts`);
  }

  getProducts(
    pageSize: number,
    pageNumber: number,
    categoryId: number,
    type: number,
    name: string = '',
    hashTag: string = '',
    fromPrice?: number,
    toPrice?: number,
    size?: string
): Observable<any> {
    var formData = new FormData();
    formData.append('PageSize', pageSize.toString());
    formData.append('PageNumber', pageNumber.toString());
    formData.append('CategoryId', categoryId.toString());
    formData.append('Type', type.toString());
    formData.append('Name', name);
    formData.append('HashTag', hashTag);
    if (fromPrice !== undefined) formData.append('FromPrice', fromPrice.toString());
    if (toPrice !== undefined) formData.append('ToPrice', toPrice.toString());
    if (size) formData.append('Size', size);

    return this.httpClient.post<any>(
        `${environment.apiUrl}/Product/GetProducts`, 
        formData
    );
}




}
