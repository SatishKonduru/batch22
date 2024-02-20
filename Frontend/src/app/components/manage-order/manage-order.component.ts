import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent {

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

}
