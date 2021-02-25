import { EditProductDynamicComponent } from './../../template/edit-product-dynamic/edit-product-dynamic.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-product-edit-admin',
  templateUrl: './product-edit-admin.component.html',
  styleUrls: ['./product-edit-admin.component.css']
})
export class ProductEditAdminComponent implements OnInit {
  @Input() variationDetail : FormGroup;
  @ViewChild(EditProductDynamicComponent) private myChild: EditProductDynamicComponent; 

  id: any
  sizeValue : any;
  detailValue : any
  price : any;
  isSizeSave: boolean = true;
  isSizeAdd: boolean = true;
  isAddVariation: boolean = false;
  isLoad: boolean = false;
  productForm : FormGroup;
  product : any ;
  variationLength : number 
  sizeLength: number;
  selectedCategory : any[];
  selectedImage : string[];
  urls : string[];
  categoryList: any = [
    { id: 1, name: 'Anime' },
    { id: 2, name: 'Shirts' },
    { id: 3, name: 'Jerseys' },
    { id: 4, name: 'Hoddies'}
  ];

  constructor(private fb:FormBuilder ,
    private productService: FirebaseProductsService,
    private router: Router,       
    private actRoute: ActivatedRoute  ) 
      { this.productForm = this.fb.group({ variationDetail: this.fb.array([]),}); 
        this.product = productService.getSingleProduct(this.id);
          }

  ngOnInit(): void {
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
  getData() {
    this.sizeValue =  this.product.sizeVariation
    console.log(this.product.sizeVariation)

    //size  control
    for(var i in this.product.sizeVariation) {
      this.addSize(this.product.sizeVariation[i].size )
      console.log(this.product.sizeVariation[i].size )

    }
    //variation control
    for(let i in this.product.productVariation){
      this.addVariation(this.product.productVariation[i].variationName);
      for(let j in this.product.productVariation[i]) {
        this.detailValue= this.product.productVariation[i].variationDetail;
      }
    }
    this.isLoad = true;
    this.isAddVariation = true;
    this.isSizeAdd = false;
    this.isSizeSave = false
}
 
  getProductData() {
    this.productService.getSingleProduct(this.id).valueChanges().subscribe(data => {
    this.product = data;  } ) }

//checkbox i
  getCategoryId(e: any, name: string) {
    (this.productForm.get("productCategory") as FormArray).reset();
    if(e.target.checked){
      console.log(name + 'Checked')
      this.product.productCategory.push(name)
    }
    else {
      console.log(name + 'unChecked')
      this.product.productCategory = this.product.productCategory.filter(m=>m!=name);
    }
    (this.productForm.get("productCategory") as FormArray).patchValue(this.product.productCategory);
    console.log(this.product.productCategory);
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
      } } console.log(this.urls); }
  

  getSizeValue() {
  this.sizeValue = this.size().value;
  console.log(this.size().value )

  this.isSizeSave = false;
  this.isAddVariation = true
  }

  //reactive form
  getinputField (field) : FormControl { return this.productForm?.get(field) as FormControl  }
  getArrayField (field) : FormArray { return this.productForm?.get(field) as FormArray  }
  size(): FormArray { return this.productForm.get("sizeVariation") as FormArray }
  addSize(size?) {  this.size().push(this.newSize(size)); this.isSizeAdd = false }
  newSize(sizes?): FormGroup {  return this.fb.group({ size: [  [sizes], Validators.required ]  })  }
  removeSize() { this.size().removeAt( this.sizeLength = this.size().length - this.size().length - 1 ); this.myChild.removeVariationDetail() }
  resetSize() {this.size().clear(); this.variation().clear(); this.isSizeSave = true; this.isAddVariation= false; this.isSizeAdd = true }
  variation() : FormArray { return this.productForm.get("productVariation") as FormArray  }
  newVariation(name?): FormGroup {  return EditProductDynamicComponent.addVariationItem(name)  }  
  addVariation(name? ) { this.variation().push(this.newVariation(name));  }
  removeVariation() { this.variation().removeAt(this.variationLength = this.variation.length - this.variation.length-1 ); }

  //setting/getting form value
  public generateProductVariation(): void {
    this. productForm = new FormGroup({
      name : new FormControl ('', Validators.required),
      description : new FormControl('', Validators.required),
      sizeVariation: new FormArray ([]),
      productVariation : new FormArray ([  EditProductDynamicComponent.addVariationItem()  ], Validators.required),
      productImages : new FormArray([ new FormControl(), new FormControl(), new FormControl(), new FormControl(), new FormControl() ]),
      productCategory : new FormArray ([ new FormControl('', Validators.required), new FormControl(), new FormControl(), new FormControl(), ]),
    })
  }

//save data to firebase
  update() {  this.productService.updateProduct(this.id, this.productForm.value);  }

  onSubmit() {
  (this.productForm.get("productImages") as FormArray).patchValue(this.product.productImages);  
// this.update();
  console.log(this.productForm.value)
 // this.router.navigate(['/inventory']);
  }

}
