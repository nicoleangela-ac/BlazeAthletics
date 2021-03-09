import { NewProductDynamicComponent } from './../../template/new-product-dynamic/new-product-dynamic.component';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Location } from '@angular/common';  
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
  selector: 'app-product-new-admin',
  templateUrl: './product-new-admin.component.html',
  styleUrls: ['./product-new-admin.component.css']
})
export class ProductNewAdminComponent implements OnInit {
 // @Input() variationDetail : FormGroup;
  @ViewChild(NewProductDynamicComponent) private myChild: NewProductDynamicComponent; 
  id: any
  sizeValue : any;
  isSizeSave: boolean = true;
  isSizeAdd: boolean = true;
  isAddVariation: boolean = false;
  productForm : FormGroup;
  variationLength : number 
  sizeLength : number;
  totalStock: number;
  lowPrice : number;
  highPrice : number;
  selectedCategory : any[];
  selectedImage : string[];
  urls : string[];
  categoryList: any = [
    { id: 1, name: 'Anime' },
    { id: 2, name: 'Shirts' },
    { id: 3, name: 'Jerseys' },
    { id: 4, name: 'Hoodies'},
    { id: 5, name: 'Featured'}

  ];

  constructor(private fb:FormBuilder ,
    private productService: FirebaseProductsService,
    private router: Router,) 
    {  this.productForm = this.fb.group({ variationDetail: this.fb.array([]) });   
  }

  ngOnInit(): void {
    this.totalStock = null;
    this.lowPrice = null;
    this.highPrice = null;
    this.selectedCategory = new Array<string>();
    this.urls = new Array<string>();
    this.generateProductVariation()
    this.categoryList
    this.isSizeSave
    this.removeVariation();
  }


//checkbox i
  getCategoryId(e: any, name: string) {
    (this.productForm.get("productCategory") as FormArray).reset();
    if(e.target.checked){
      console.log(name + 'Checked')
      this.selectedCategory.push(name)
    }
    else {
      console.log(name + 'unChecked')
      this.selectedCategory = this.selectedCategory.filter(m=>m!=name);
    }
    (this.productForm.get("productCategory") as FormArray).patchValue(this.selectedCategory);
    console.log(this.selectedCategory);
  }


  //upload multiple images
  count : number;
  selectFile(event) {
    this.count = 0
    this.urls = [];
    var files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        if(this.count!=5) { 
        reader.onload = (e: any) => { this.urls.push(e.target.result);}
        this.count++; }
        reader.readAsDataURL(file);
      } } console.log(this.urls); }
  
  getSizeValue() {
  this.sizeValue = Object.values(this.size().value);
  this.isSizeSave = false;
  this.isAddVariation = true
  }

  //reactive form
  getinputField (field) : FormControl { return this.productForm?.get(field) as FormControl  }
  getArrayField (field) : FormArray { return this.productForm?.get(field) as FormArray  }
  size(): FormArray { return this.productForm.get("sizeVariation") as FormArray }
  addSize() {  this.size().push(this.newSize()); this.isSizeAdd = false}
  newSize(): FormGroup {  return this.fb.group({  size: [[], Validators.required]  })  }
  removeSize() { this.size().removeAt( this.sizeLength = this.size().length - this.size().length - 1 ); this.myChild.removeVariationDetail() }
  resetSize() {this.size().clear(); this.variation().clear(); this.isSizeSave = true; this.isAddVariation= false; this.isSizeAdd = true }
  variation() : FormArray { return this.productForm.get("productVariation") as FormArray  }
  newVariation(): FormGroup {  return NewProductDynamicComponent.addVariationItem()  }  
  addVariation() { this.variation().push(this.newVariation()); }
  removeVariation() { this.variation().removeAt(this.variationLength = this.variation.length - this.variation.length-1 ); }
  stock() : FormControl { return this.productForm.get("totalStock") as FormControl  }  //setting/getting form value
  hPrice() : FormControl { return this.productForm.get("highPrice") as FormControl  }  //setting/getting form value
  lPrice() : FormControl { return this.productForm.get("lowPrice") as FormControl  }  //setting/getting form value

  //setting/getting form value
  public generateProductVariation(): void {
    this. productForm = new FormGroup({
      name : new FormControl ('', Validators.required),
      description : new FormControl('', Validators.required),
      sizeVariation: new FormArray ([ ], Validators.required),
      soldProducts: new FormControl(0),
      totalStock : new FormControl(''),
      highPrice : new FormControl(''),
      lowPrice : new FormControl(''),
      productVariation : new FormArray ([ NewProductDynamicComponent.addVariationItem() ], Validators.required),
      productImages : new FormArray([ new FormControl(), new FormControl(), new FormControl(), new FormControl(), new FormControl() ]),
      productCategory : new FormArray ([ new FormControl('', Validators.required), new FormControl(), new FormControl(), new FormControl(), new FormControl(), ]),
    })
  }

  getTotalStock() {
    for(var i in this.productForm.value.productVariation) {
        for(var k in this.productForm.value.productVariation[i].variationDetail) {
          this.totalStock += this.productForm.value.productVariation[i].variationDetail[k].stock
        }
    }
    this.stock().setValue(this.totalStock);
  }
  getLowPrice() {
    this.lowPrice = this.productForm.value.productVariation[0].variationDetail[0].price
    for(var i in this.productForm.value.productVariation) {
      for(var k in this.productForm.value.productVariation[i].variationDetail) {
        if ( this.lowPrice > this.productForm.value.productVariation[i].variationDetail[k].price) {
          this.lowPrice = this.productForm.value.productVariation[i].variationDetail[k].price
        }
      }
  }
    this.lPrice().setValue(this.lowPrice);
  }
  
  getHighPrice() {
    this.highPrice = this.productForm.value.productVariation[0].variationDetail[0].price
    for(var i in this.productForm.value.productVariation) {
      for(var k in this.productForm.value.productVariation[i].variationDetail) {
        if ( this.lowPrice < this.productForm.value.productVariation[i].variationDetail[k].price) {
          this.highPrice = this.productForm.value.productVariation[i].variationDetail[k].price
        }
      }
  }
    this.hPrice().setValue(this.highPrice);
  }
//save data to firebase
  save() {  this.productService.createProduct(this.productForm.value);  }

  onSubmit() {
    (this.productForm.get("productImages") as FormArray).patchValue(this.urls);  
    this.getTotalStock()
    this.getLowPrice()
    this.getHighPrice()
    this.save();
   // console.log(this.productForm.value)
    this.router.navigate(['/inventory']);
  }
}