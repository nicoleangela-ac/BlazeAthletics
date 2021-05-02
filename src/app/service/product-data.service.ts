import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ProductDataModel } from "../models/product-data-model";

@Injectable({
    providedIn:'root'
})
export class ProducDataService 
{
    productDataChanged = new Subject<ProductDataModel[]>();

    readonly PRODUCTDATA: string = 'productData';
    private productData: ProductDataModel[] = [];
    indexNumber: number = null;

    getProductsData()
    {
        if(this.productData != null){
            return this.productData.slice();
        }
        return this.productData;
    }

    getProduct(index: number)
    {
      return this.productData[index];
    }

    updateProduct(index: number, newProductData: ProductDataModel)
    {
      this.productData[index] = newProductData;
      this.productDataChanged.next(this.productData.slice());
      this.setProductData(this.productData.slice());
    }

    addProduct(product: ProductDataModel)
    {
      if(this.productData != null)
      {
        this.productData.push(product);
      } 
      else
      {
        this.productData = [new ProductDataModel(
            product.productImage,
            product.productName,
            product.productId,
            product.variationName,
            product.size,
            product.price,
            product.noItem
        )];
      }   
      this.productDataChanged.next(this.productData.slice());
    }

    deleteProduct(index: number)
    {
      this.productData.splice(index, 1);
      this.productDataChanged.next(this.productData.slice());
    }

    setProductData(productData: ProductDataModel[])
    {
        this.productData = productData;
        if(this.productData != null){
            this.productDataChanged.next(this.productData.slice());
        }
    }
}