import { EditProductDynamicComponent } from './../../template/edit-product-dynamic/edit-product-dynamic.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, NumberValueAccessor } from '@angular/forms'

@Component({
  selector: 'app-product-edit-admin',
  templateUrl: './product-edit-admin.component.html',
  styleUrls: ['./product-edit-admin.component.css']
})
export class ProductEditAdminComponent implements OnInit {
  @Input() variationDetail : FormGroup;
  @ViewChild(EditProductDynamicComponent) private myChild: EditProductDynamicComponent; 

  isLoading = false;
  id: any
  sizeValue : any;
  detailValue : any;
  price : any;
  isSizeSave: boolean = true;
  isSizeAdd: boolean = true;
  isAddVariation: boolean = false;
  productForm : FormGroup;
  product : any ;
  variationLength : number 
  sizeLength: number;
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
    { id: 4, name: 'Hoodies'}
  ];


  constructor(private fb:FormBuilder ,
    private productService: FirebaseProductsService,
    private router: Router,       
    private actRoute: ActivatedRoute  ) 
      { this.productForm = this.fb.group({ variationDetail: this.fb.array([]),}); 
        this.product = productService.getSingleProduct(this.id);
          }

  ngOnInit(): void {
    this.isLoading = true;
    this.totalStock = null;
    this.lowPrice = null;
    this.highPrice = null;
    this.selectedCategory = new Array<string>();
    this.urls = new Array<string>();
    this.generateProductVariation()
    this.categoryList
    this.id = this.actRoute.snapshot.paramMap.get('id');  
    this.isSizeSave
    this.getProductData(); 
    this.removeVariation();
      }

  isChecked(name) : boolean{
    for(var i in this.product.productCategory){
        if(this.product.productCategory[i] == name ) {
        return true       
      }
        else {false}
    }
    return false
  }

  setFeature(e: any) {
  if(e.target.checked){
   this.getinputField('featureProduct').setValue('yes');
      }
    else {
      this.getinputField('featureProduct').setValue('no');
    }
  }

  isFeature() : boolean{
    if(this.product.featureProduct== 'yes') {
      return true
    }
    else{
      return false
    }
  }

  getProductData() {
    this.productService.getSingleProduct(this.id).valueChanges().subscribe(data => {
    this.product = data;  
    this.isLoading = false; 
    this.getData();
  
  } ) 
}

  getData() {
    this.sizeValue= Object.values(this.product.sizeVariation ) 
    this.getinputField("soldProducts").setValue(this.product.soldProducts);
    this.getArrayField("productCategory" ).patchValue(this.product.productCategory);
    this.getinputField("name").setValue(this.product.name)
    this.getinputField("description").setValue(this.product.description);
    
    //size  control
    for(var i in this.product.sizeVariation) {
      this.addSize(this.product.sizeVariation[i].size)
    }

    //variation control
    for(let i in this.product.productVariation){
      this.addVariation(this.product.productVariation[i].variationName);
    //  this.myChild.setPriceStock(this.product.productVariation[i].variationDetail );
      EditProductDynamicComponent.detailValue = this.product.productVariation
      console.log(  EditProductDynamicComponent.detailValue )
    } 


    this.isAddVariation = true;
    this.isSizeAdd = false;
    this.isSizeSave = false
  }


  //checkbox i
  getCategoryId(e: any, name: string) {
    (this.productForm.get("productCategory") as FormArray).reset();
    if(e.target.checked){
      this.product.productCategory.push(name)
    }
    else {
      this.product.productCategory = this.product.productCategory.filter(m=>m!=name);
    }
    (this.productForm.get("productCategory") as FormArray).patchValue(this.product.productCategory);
  }


  //upload multiple images
  count : number;
  selectFile(event) {
    this.count = 0
    this.product.productImages = [];
    var files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        if(this.count!=5) { 
        reader.onload = (e: any) => { this.product.productImages.push(e.target.result);}
        this.count++; }
        reader.readAsDataURL(file);
      } } }

  getSizeValue() {
  this.sizeValue = Object.values(this.getArrayField("sizeVariation").value);
  this.detailValue = null;
  this.isSizeSave = false;
  this.isAddVariation = true
  }

  //reactive form
  getinputField (field) : FormControl { return this.productForm?.get(field) as FormControl  }
  getArrayField (field) : FormArray { return this.productForm?.get(field) as FormArray  }

  //Size Form Functions
  addSize(size?) {  this.getArrayField("sizeVariation").push(this.newSize(size)); this.isSizeAdd = false }
  newSize(sizes?): FormGroup { 
     return this.fb.group({
        size: [  [sizes], Validators.required ] 
       }  )  }

  removeSize() { 
    this.getArrayField("sizeVariation").removeAt( this.sizeLength = this.getArrayField("sizeVariation").length - this.getArrayField("sizeVariation").length - 1 ); 
    this.myChild.removeVariationDetail() 
  }

  resetSize() { 
    this.getArrayField("sizeVariation").clear();
    this.getArrayField("sizeVariation").reset();
    this.getArrayField("productVariation").clear(); 
    this.getArrayField("productVariation").reset(); 
    EditProductDynamicComponent.detailValue = null;
     this.isAddVariation = false;
     this.isSizeSave = true; 
     this.isAddVariation= false; 
     this.isSizeAdd = true; 
    }
//Variation Form Functions
  newVariation(name?): FormGroup {  return EditProductDynamicComponent.addVariationItem(name)  }  
  addVariation(name?) { this.getArrayField("productVariation").push(this.newVariation(name));  }
  removeVariation() { 
    this.getArrayField("productVariation").removeAt( 
      this.variationLength = this.getArrayField("productVariation").length 
        - this.getArrayField("productVariation").length-1 ); }

  public generateProductVariation(): void {
    this. productForm = new FormGroup({
      name : new FormControl ('', Validators.required),
      description : new FormControl('', Validators.required),
      sizeVariation: new FormArray ([]),
      soldProducts: new FormControl(),
      totalStock : new FormControl(''),
      highPrice : new FormControl(''),
      lowPrice : new FormControl(''),
      featureProduct: new FormControl(),
      productVariation : new FormArray ([  EditProductDynamicComponent.addVariationItem()  ], Validators.required),
      productImages : new FormArray([ new FormControl(), new FormControl(), new FormControl(), new FormControl(), new FormControl() ]),
      productCategory : new FormArray ([ new FormControl('', Validators.required),new FormControl(),new FormControl(), new FormControl(), ]),
    })
  }

  //get Total Stock and Price High n Low Range
getPriceRangeandStock() {
  this.highPrice = this.productForm.value.productVariation[0].variationDetail[0].price
  this.lowPrice = this.productForm.value.productVariation[0].variationDetail[0].price
  for(var i in this.productForm.value.productVariation) {
    for(var k in this.productForm.value.productVariation[i].variationDetail) {
      this.totalStock += this.productForm.value.productVariation[i].variationDetail[k].stock
      if ( this.lowPrice < this.productForm.value.productVariation[i].variationDetail[k].price) {
        this.highPrice = this.productForm.value.productVariation[i].variationDetail[k].price
      }
      else if (this.lowPrice > this.productForm.value.productVariation[i].variationDetail[k].price) {
        this.lowPrice = this.productForm.value.productVariation[i].variationDetail[k].price
      }
    }
}
  this.getinputField("highPrice").setValue(this.highPrice);
  this.getinputField("lowPrice").setValue(this.lowPrice);
  this.getinputField("totalStock").setValue(this.totalStock);
}

//save data to firebase
  update() { 
    (this.productForm.get("productImages") as FormArray).patchValue(this.product.productImages);  
    this.getArrayField("sizeVariation").setValue(Object.values(this.sizeValue )) 
    this.getPriceRangeandStock()    
    this.productService.updateProduct(this.id, this.productForm.value);  
  }

  onSubmit() {
  this.update();
  console.log(this.productForm.value)
  this.router.navigate(['/inventory']);
  }

}
