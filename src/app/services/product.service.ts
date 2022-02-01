import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }
  postProduct(data: any){
    return this.httpClient.post<any>("http://localhost:5000/productList/",data)
  }
  getProduct(){
    return this.httpClient.get<any>("http://localhost:5000/productList/")
  }
  updateProduct(data:any, id:number){
    return this.httpClient.put<any>("http://localhost:5000/productList/"+id,data)
  }
  deleteProduct(id: number){
    return this.httpClient.delete<any>("http://localhost:5000/productList/"+id)
  }
}
