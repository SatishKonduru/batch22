import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  onAddProduct = new EventEmitter()
  onEditProduct = new EventEmitter()
  productForm : FormGroup
  dialogAction = 'Add'
  action = 'Add'
  responseMsg: any = ''
  categories : any[]
  constructor(
    @Inject (MAT_DIALOG_DATA) public dialogData: any,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private _snackbar: SnackbarService
  ){}

ngOnInit(): void {
  this.productForm = this._formBuilder.group({
    name: [null, [Validators.required]],
    categoryId: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]]
  })
    if(this.dialogData.action == 'Edit'){
      this.dialogAction = 'Edit'
      this.action = 'Update'
      this.productForm.patchValue(this.dialogData.data)
    }
    this.getCategories()
 }

 getCategories(){
  this._categoryService.getCategories()
  .subscribe((res: any) => {
    this.categories = res
    console.log("Existing Categories: ", this.categories)
  }, (err: any) => {
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
 }

 handleSubmit(){
  if(this.dialogAction == 'Edit'){
    this.edit()
  }
  else{
    this.add()
  }
 }

 add(){
  var formData = this.productForm.value
  var data = {
    name: formData.name,
    categoryId: formData.categoryId,
    description: formData.description,
    price: formData.price
  }
this._productService.add(data)
.subscribe((res: any) => {
  this.dialogRef.close()
  this.onAddProduct.emit()
  this.responseMsg = res.message
  this._snackbar.openSnackbar(this.responseMsg, 'success')
}, (err: any) => {
  this.dialogRef.close()
  if(err.error?.message){
    this.responseMsg = err.error?.message
  }
  else{
    this.responseMsg = globalProperties.genericError
  }
  this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
})


 }

 edit(){
  var formData = this.productForm.value
  var data = {
    id: this.dialogData.data.id,
    name: formData.name,
    categoryId: formData.categoryId,
    description: formData.description,
    price: formData.price
  }
  this._productService.update(data)
  .subscribe((res: any) => {
    this.dialogRef.close()
    this.onEditProduct.emit()
    this.responseMsg = res.message
    this._snackbar.openSnackbar(this.responseMsg, 'success')
  },(err: any) => {
    this.dialogRef.close()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
 }

}
