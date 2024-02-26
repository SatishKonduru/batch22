import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit{

 displayedColumns : string[] = ['name','category','price','quantity','total', 'edit']
 dataSource: any = []
 manageOrderForm : any = FormGroup
 categories: any = []
 products : any = []
 price: any;
totalAmount : number = 0
length : any
responseMsg :any;

@ViewChild(MatPaginator) paginator : MatPaginator;

constructor(
  private _formBuilder: FormBuilder,
  private _categoryService: CategoryService,
  private _productService: ProductService,
  private _ngxService: NgxUiLoaderService,
  private _snackbar: SnackbarService,
  private _billService: BillService
){}

ngOnInit(): void {
  this._ngxService.start()
  this.getCategories()
  this.manageOrderForm = this._formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    contactNumber: [null, [Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]],
    paymentMethod: [null, [Validators.required]],
    product : [null, [Validators.required]],
    category: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    price: [null, [Validators.required]],
    total: [0, [Validators.required]]
  })
}

getCategories(){
  this._categoryService.getCategories()
  .subscribe( (res: any) => {
    this._ngxService.stop()
    this.categories = res
  }, (err: any) => {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
}

getProductByCategory(item: any){
  this._productService.getProductByCategory(item.id)
  .subscribe((res: any) => {
    this.products = res
    this.manageOrderForm.controls['price'].setValue('')
    this.manageOrderForm.controls['quantity'].setValue('')
    this.manageOrderForm.controls['total'].setValule('')
  }, (err: any) => {
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = globalProperties.genericError
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
}

getProductDetails(item: any){
  this._productService.getById(item.id)
  .subscribe((res: any) => {
      this.price = res.price
      this.manageOrderForm.controls['price'].setValue(this.price)
      this.manageOrderForm.controls['quantity'].setValue(1);
      this.manageOrderForm.controls['total'].setValue(this.price * 1)
  }, (err: any) =>{
    this._ngxService.stop()
    if(err.error?.message){
      this.responseMsg = err.error?.message
    }
    else{
      this.responseMsg = err.error?.message
    }
    this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
}


setQuantity(value: any){
  var temp  = this.manageOrderForm.controls['quantity'].value
  if(temp > 0){
    this.manageOrderForm.controls['total'].setValue(
      this.manageOrderForm.controls['quantity'].value *
      this.manageOrderForm.controls['price'].value
    )
  }
  else if(temp != ''){
    this.manageOrderForm.controls['quantity'].setValue(1)
    this.manageOrderForm.controls['total'].setValue(
      this.manageOrderForm.controls['quantity'].value *
      this.manageOrderForm.controls['price'].value
    )
  }
  // else{}
}


validateProductAddButton(){
  if(this.manageOrderForm.controls['total'].value === 0 ||
    this.manageOrderForm.controls['total'].value === null ||
    this.manageOrderForm.controls['quantity'].value <= 0)
    {
      return true
    }
    else{
      return false
    }
}


validateSubmit(){
  if(
    this.totalAmount === 0 ||
    this.manageOrderForm.controls['name'].value === null ||
    this.manageOrderForm.controls['email'].value === null ||
    this.manageOrderForm.controls['contactNumber'].value === null ||
    this.manageOrderForm.controls['paymentMethod'].value === null ||
    !(this.manageOrderForm.controls['contactNumber'].valid || this.manageOrderForm.controls['email'].valid)
   ){
    return true
   }
   else{
    return false
   }
}

add(){
  var formData = this.manageOrderForm.value
  var productName = this.dataSource.find((e: {id: number;}) => 
    e.id == formData.product.id
  )

  if(productName === undefined){
    this.totalAmount = this.totalAmount + formData.total
    this.dataSource.push({
      id: formData.product.id,
      name: formData.product.name,
      category: formData.category.name,
      quantity: formData.quantity,
      price: formData.price,
      total: formData.total
    })
    this.dataSource = [...this.dataSource]
    this.length = this.dataSource.length
    this.dataSource.paginator = this.paginator
    this._snackbar.openSnackbar(globalProperties.productAdded, 'success')
  }
  else{
    this._snackbar.openSnackbar(globalProperties.productExistsError, globalProperties.error)
  }
}


handleDeleteAction(value: any, element: any){
  this.totalAmount = this.totalAmount - element.total
  this.dataSource.splice(value, 1)
  this.dataSource = [...this.dataSource]
  this.length = this.dataSource.length
  this.dataSource.paginator = this.paginator
}

submitAction(){
  this._ngxService.start()
  var formData = this.manageOrderForm.value
  var data = {
    name: formData.name,
    email: formData.email,
    contactNumber: formData.contactNumber,
    paymentMethod: formData.paymentMethod,
    totalAmount: this.totalAmount,
    productDetails: JSON.stringify(this.dataSource)
  }
  this._billService.generateReport(data)
  .subscribe((res: any) => {
      this.downloadFile(res?.uuid)
      this.manageOrderForm.reset()
      this.dataSource = []
      this.totalAmount = 0
  }, (err: any) => {
      this._ngxService.stop()
      if(err.error?.message){
        this.responseMsg = err.error?.message
      }
      else{
        this.responseMsg = globalProperties.genericError
      }
      this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  })
}

downloadFile(fileName: any){
  var data = {
    uuid: fileName
  }
  this._billService.getPdf(data)
  .subscribe((res: any) => {
    saveAs(res, fileName+'.pdf')
    this._ngxService.stop()
  })
}



}
