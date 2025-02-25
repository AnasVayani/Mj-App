import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Category/GetAll`);
  }

  getMenProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetMenProducts`);
  }

  getWomenProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetWomenProducts`);
  }

  getProducts(
    pageSize: number,
    pageNumber: number,
    categoryId?: number,
    type?: number,
    name: string = '',
    hashTag: string = '',
    fromPrice?: number,
    toPrice?: number,
    size?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    if (categoryId !== undefined) params = params.set('categoryId', categoryId.toString());
    if (type !== undefined) params = params.set('type', type.toString());
    if (name) params = params.set('name', name);
    if (hashTag) params = params.set('hashTag', hashTag);
    if (fromPrice !== undefined) params = params.set('fromPrice', fromPrice.toString());
    if (toPrice !== undefined) params = params.set('toPrice', toPrice.toString());
    if (size) params = params.set('size', size);

    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetProducts`, { params });
  }
  
  
}
