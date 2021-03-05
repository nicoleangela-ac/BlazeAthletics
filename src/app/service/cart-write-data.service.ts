import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { ProductDataModel } from "../models/product-data-model";
import { ProducDataService } from "./product-data.service";

@Injectable({
    providedIn:'root'
})
export class CartWriteData
{
    constructor(private http : HttpClient, private productService: ProducDataService){}

    putCartData(UID: string)
    {
      const productData = this.productService.getProductsData();  
      return this.http.put('https://blazestorage-92eaf-default-rtdb.firebaseio.com/cartData/' + UID +'.json', productData);  
    }

    getCartData(UID: string)
    {
     return this.http.get<ProductDataModel[]>('https://blazestorage-92eaf-default-rtdb.firebaseio.com/cartData/' + UID +'.json');
    }
}
