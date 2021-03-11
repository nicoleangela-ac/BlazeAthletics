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
  static detailValue?: any;
  detailLength: number;  
  value : number
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
    this.value = 1;
    this.getSizeControl();  
 }

  getSizeControl() { 
    if (NewProductDynamicComponent.detailValue.length > 0 ) {
    for(var j in NewProductDynamicComponent.detailValue) {
        if( NewProductDynamicComponent.detailValue[j].variationName == this.getinputField('variationName').value) {
          for (var i in this.sizeValue) { 
          if(NewProductDynamicComponent.detailValue[j].variationDetail[i] != undefined) {
              this.detailList().push(this.newDetail(
                this.sizeValue[i].size, 
                NewProductDynamicComponent.detailValue[j].variationDetail[i].stock,
                NewProductDynamicComponent.detailValue[j].variationDetail[i].price ) );            
          }
           else {
             for(var k in this.getArrayField('variationDetail').value ) {
              if(this.sizeValue[i] != this.getArrayField('variationDetail').value[k].size && this.value == 1) 
                {
                this.detailList().push(this.newDetail(this.sizeValue[i].size)); 
                this.value++;             
                }                
             } 
          }
            }           
        }
        else if (this.getinputField('variationName').value == null && this.value == 1) {
          this.setSizeControl();
          this.value++;      
        }
      } 
    }
    else {
      for (var i in this.sizeValue) { 
        this.detailList().push(this.newDetail(this.sizeValue[i].size));
      }       
    }


  } 
    
  public setSizeControl() {
    for (var i in this.sizeValue) { 
      this.detailList().push(this.newDetail(
        this.sizeValue[i].size) );
        } 
  }

  getinputField (field) : FormControl { return this.variationForm?.get(field) as FormControl  }
  getArrayField (field) : FormArray { return this.variationForm?.get(field) as FormArray  }
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
