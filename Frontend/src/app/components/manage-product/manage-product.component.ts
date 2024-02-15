import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ProductComponent } from '../product/product.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit{

  displayedColumns : string[] = ['name','categoryName', 'description', 'price','edit'];
  dataSource: any;
  responseMsg:  any = ''
  searchKey :  string = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _productService: ProductService,
    private _ngxService: NgxUiLoaderService,
    private _userDialog: MatDialog,
    private _snackbar: SnackbarService,
    private _router: Router
  ){}

ngOnInit(): void {
  this._ngxService.start()
  this.tableData()
}

tableData(){
  this._productService.getProducts()
  .subscribe( (res: any) => {
    this._ngxService.stop()
    this.dataSource = new MatTableDataSource(res)
    this.dataSource.paginator = this.paginator
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

addProduct(){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = {action: 'Add'}
  dialogConfig.width = '300px'
  dialogConfig.disableClose = true
  dialogConfig.position = {
    top: '100px', left: '48rem'
  }
  const dialogRef = this._userDialog.open(ProductComponent, dialogConfig)
  this._router.events.subscribe(()=>{
    dialogRef.close()
  })

  // dialogRef.componentInstance.onAddProduct.subscribe(()=> {
  //   this.tableData()
  // })
}

editProduct(item: any) {
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = {
    data: item,
    action: 'Edit'
  }
  dialogConfig.width = '300px'
  dialogConfig.disableClose = true
  dialogConfig.position = {
    top: '100px', left: '48rem'
  }
  const dialogRef = this._userDialog.open(ProductComponent, dialogConfig)
  this._router.events.subscribe(()=>{
    dialogRef.close()
  })
 // dialogRef.componentInstance.onEditProduct.subscribe(()=> {
  //   this.tableData()
  // })
}

onSearchClear(){
  this.searchKey = ''
  this.applyFilter('')
}
applyFilter(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase()
}

}
