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
    color?: string[]
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

  searchProducts(keyword: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/SearchProducts?searchKeyword=${keyword}`)
  }

  addToCart(request: any) {
    const requestData = {
      UserId: request.userId,
      GuestToken: request.guestToken,
      ProductId: request.productId,
      Quantity: request.quantity,
      Price: request.price,
      Size: request.size,
      Color: request.color
    };
    return this.httpClient.post<any>(
      `${environment.apiUrl}/Order/AddToCart`,
      requestData
    );
  }

  getCartItems(userId: number | null, guestToken: string | null) {
    if (!userId && !guestToken) {
      return;
    }
    let params = new HttpParams();
    if (userId !== null) {
      params = params.set('userId', userId.toString());
    }
    if (guestToken !== null) {
      params = params.set('guestToken', guestToken);
    }

    return this.httpClient.get<any>(`${environment.apiUrl}/Order/GetCartItems`, { params });
  }

  removeCartItem(id: number) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.delete<any>(`${environment.apiUrl}/Order/RemoveCartItem`, { params });
  }

  updateCartItemQuantity(id: number, quantity: number) {
    let params = new HttpParams();
    params = params.set('id', id);
    params = params.set('quantity', quantity);
    return this.httpClient.get<any>(`${environment.apiUrl}/Order/UpdateCartItemQuantity`, { params });
  }

}
