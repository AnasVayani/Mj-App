import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderRequest } from '../model/order-model';

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

  getRelatedProductsByColor(color: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetRelatedProductsByColor?color=${color}`)
  }

  getProductReviews(id: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Product/GetProductReviews?productId=${id}`)
  }

  saveProductReview(request: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/Product/SaveProductReview`, request
    );
  }

  registerUser(request: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/Auth/Register`, request
    );
  }

  loginUser(email: string, password: string) {
    let params = new HttpParams();
    params = params.set('email', email);
    params = params.set('password', password);
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/Login`, { params });
  }

  paymentCheckout(request: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/Auth/ProcessPayment`, request
    );
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('UserContext');
    if (user == null || user == undefined) {
      return false;
    }
    var parsedJson = JSON.parse(user);
    return !!parsedJson.token;
  }

  getUserWishlist() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/GetUserWishlist`);
  }

  addToWishlist(productId: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/AddToWishlist?productId=${productId}`);
  }

  getCurrentUser() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/GetCurrentUser`);
  }

  editUserDetails(request: any) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/Auth/EditUserDetails`, request
    );
  }

  getCountries() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/GetCountries`);
  }

  getCities(stateId: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/GetCities?stateId=${stateId}`);
  }

  getStates(countryId: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/GetStates?countryId=${countryId}`);
  }

  getUserAddresses() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/GetUserAddresses`);
  }

  deletedUserAddress(addressId: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/Auth/DeletedUserAddress?addressId=${addressId}`);
  }

  addOrUpdateUserAddress(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/Auth/AddOrUpdateUserAddress`, request);
  }

  getOrdersGrandTotal(userId: number | null, guestToken: string | null) {
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

    return this.httpClient.get<any>(`${environment.apiUrl}/Order/GetOrdersGrandTotal`, { params });
  }

  currentUserId() {
    const user = localStorage.getItem('UserContext');
    if (user == null || user == undefined) {
      return null;
    }
    var parsedJson = JSON.parse(user);
    return parsedJson?.id ?? null;
  }

  getCurrency(): string {
    var country = localStorage.getItem("selectedCountry")
    if (country && country == "Pakistan") {
      return "PKR"
    }
    return "USD"
  }

  orderCheckOut(model: OrderRequest) : Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/Order/CreateOrder`, model)
  }

  getUserOrders() {
    return this.httpClient.get<any>(`${environment.apiUrl}/Order/GetUserOrders`);
  }
  
}
