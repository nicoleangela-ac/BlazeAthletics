import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  AngularFireObject } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProductsService {
  private dbPathProducts = '/products';
  private dbPathFaqs ='/faqs';
  private dbPathShopImg = '/shopImages';
<<<<<<< HEAD
  private dbPathBannerImg ='/bannerImgs';
=======
>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5

  productRef: AngularFireList<any[]> = null;
  faqsRef: AngularFireList<any[]> = null;
  shopImgRef: AngularFireList<any[]> = null;
<<<<<<< HEAD
  bannerImgRef: AngularFireList<any[]> = null;
  shopImg: AngularFireObject<any[]> = null;
=======
>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5
  productItem: AngularFireObject<any[]> = null;
  PriceStock : Promise<DataSnapshot> = null;
  productId: any;
  productData : any;

  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPathProducts);
    this.faqsRef = db.list(this.dbPathFaqs);
    this.shopImgRef= db.list(this.dbPathShopImg);
<<<<<<< HEAD
    this.bannerImgRef = db.list(this.dbPathBannerImg);
=======
>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5
   }

   //query for products data
  createProduct(product: any[]): void {  
     this.productRef.push(product)
  }
  getProductData(): AngularFireList<any> {
    return this.productRef;
  }
<<<<<<< HEAD
=======

>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5
  getSingleProduct(id: string) {
    this.productItem = this.db.object(this.dbPathProducts + '/'+ id);
    return this.productItem;
  }
  getPriceStock(id) {
    this.productItem = this.db.object(this.dbPathProducts + '/'+ id);
    this.PriceStock= this.productItem.query.equalTo('small','size').get( )
    return this.PriceStock;
  }
  updateProduct(key: string, value: any): Promise<any> {
    return this.productRef.update(key, value);
  }

  deleteProduct(key: string): Promise<any> {
    return this.productRef.remove(key);
  }


  //other data
  getFaqsData (): AngularFireList<any> {
    return this.faqsRef;
  }
  getShopImg(): AngularFireList<any>{
    return this.shopImgRef;
  }
<<<<<<< HEAD
  getShopPageImg(id) :AngularFireObject<any> {
    this.shopImg = this.db.object(this.dbPathShopImg + '/' + id);
    return this.shopImg;
  }
 
=======
>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5
}
