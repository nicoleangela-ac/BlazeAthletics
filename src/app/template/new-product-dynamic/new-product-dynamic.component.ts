import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-new-product-dynamic',
  templateUrl: './new-product-dynamic.component.html',
  styleUrls: ['./new-product-dynamic.component.css']
})
export class NewProductDynamicComponent implements OnInit {

  @Input() sizeValue: any;
  @Input() public variationForm : FormGroup;
  detailLength: number;  

  constructor(private fb:FormBuilder) {
    this.variationForm = this.fb.group({ variationDetail: this.fb.array([]) });   
  }

  static addVariationItem() : FormGroup {
    return new FormGroup ( {
      variationName : new FormControl ('',Validators.required),
      variationDetail : new FormArray ([], Validators.required),
    } ) 
  }
  ngOnInit() {  
    this.getSizeControl();  
 }

  getSizeControl() { 
    for (var i in this.sizeValue) { 
      this.detailList().push(this.newDetail(this.sizeValue[i].size));
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
