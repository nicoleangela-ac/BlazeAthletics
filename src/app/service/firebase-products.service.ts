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
  private dbPathBannerImg ='/bannerImgs';

  productRef: AngularFireList<any[]> = null;
  faqsRef: AngularFireList<any[]> = null;
  shopImgRef: AngularFireList<any[]> = null;
  bannerImgRef: AngularFireList<any[]> = null;
  shopImg: AngularFireObject<any[]> = null;
  productItem: AngularFireObject<any[]> = null;
  PriceStock : Promise<DataSnapshot> = null;
  productId: any;
  productData : any;

  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPathProducts);
    this.faqsRef = db.list(this.dbPathFaqs);
    this.shopImgRef= db.list(this.dbPathShopImg);
    this.bannerImgRef = db.list(this.dbPathBannerImg);
   }

   //query for products data
  createProduct(product: any[]): void {  
     this.productRef.push(product)
  }
  getProductData(): AngularFireList<any[]> {
    return this.productRef;
  }
  getSingleProduct(id: string) {
    this.productItem = this.db.object(this.dbPathProducts + '/'+ id);
    return this.productItem;
  }
  getCategory() {
  return  this.productRef.query.orderByChild('productCategory').equalTo('Anime').on('value', snap => 
    console.log(snap.val()))
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
  getShopPageImg(id) :AngularFireObject<any> {
    this.shopImg = this.db.object(this.dbPathShopImg + '/' + id);
    return this.shopImg;
  }
 
}
