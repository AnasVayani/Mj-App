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

  getDealsBanner(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetProductDealsBanner`);
  }

  getBestSeller(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetBestSellingProducts`);
  }

  getWeeklyDeals(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetWeeklyDealProducts`);
  }

  getProducts(
    pageSize: number,
    pageNumber: number,
    categoryId: number[] | null,
    type: number | null,
    name: string = '',
    hashTag: string = '',
    fromPrice?: number,
    toPrice?: number,
    size?: string[],
    color?:string[]
  ): Observable<any> {

    const requestData = {
      PageSize: pageSize,
      PageNumber: pageNumber,
      CategoryId: categoryId,
      Type: type,
      Name: name,
      FromPrice: fromPrice,
      ToPrice: toPrice,
      HashTag: hashTag,
      Size: size,
      Color: color
    };
   
    return this.httpClient.post<any>(
      `${environment.apiUrl}/Product/GetProducts`,
      requestData
    );
  }

  getCategoriesByType(type: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Category/GetCategoriesByType?type=${type}`)
  }

  GetProductById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetProduct?id=${id}`)
  }


}
