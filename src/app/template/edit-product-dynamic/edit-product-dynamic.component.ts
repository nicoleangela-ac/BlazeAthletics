import { FormGroup, FormControl, FormArray, FormArrayName, FormBuilder, Validators, FormGroupName, AbstractControl } from '@angular/forms'
import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-edit-product-dynamic',
  templateUrl: './edit-product-dynamic.component.html',
  styleUrls: ['./edit-product-dynamic.component.css']
})
export class EditProductDynamicComponent {

  @Input() sizeValue: any;
  @Input() detailValue: any;
  @Input() public variationForm : FormGroup;
  detailLength: number;  

  constructor(private fb:FormBuilder) {
    this.variationForm = this.fb.group({ variationDetail: this.fb.array([]) });   
  }

  static addVariationItem(name?) : FormGroup {
    return new FormGroup ( {
      variationName : new FormControl (name,Validators.required),
      variationDetail : new FormArray ([], Validators.required),
    } ) 
  }
  ngOnInit() {  
    this.getSizeControl();  
 }

  getSizeControl() { 
    for (var i in this.sizeValue) { 
      this.detailList().push(this.newDetail(
        this.sizeValue[i].size,
        this.detailValue[i].stock,
        this.detailValue[i].price ) );
        } 
      } 
    

  getinputField (field) : FormControl { return this.variationForm?.get(field) as FormControl  }
  detailList() : FormArray {  return this.variationForm.get("variationDetail") as FormArray }
  addVariationDetail() { this.getSizeControl()  }
  removeVariationDetail() { this.detailList().removeAt(this.detailLength = this.detailList.length - this.detailList.length-1) }
  newDetail(size, stock?, price?): FormGroup {
    return this.fb.group({
      size:  [size, Validators.required],
      stock: [stock, Validators.required],
      price: [price, Validators.required],
    })
  }

}
