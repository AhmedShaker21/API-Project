import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {

  constructor(private _HttpClient: HttpClient) { }
  getAPI() : Observable<any>{
    return this._HttpClient.get("https://fakestoreapi.com/products");
  }
  getSelectedProduct(): Observable<any> {
    return this._HttpClient.get("https://fakestoreapi.com/products/categories");
  }
  setSelectedProduct(selected:string): Observable<any> {
    return this._HttpClient.get("https://fakestoreapi.com/products/category/" + selected);
  }
}
