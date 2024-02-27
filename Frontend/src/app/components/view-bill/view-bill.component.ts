import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { ViewBillProductsComponent } from '../view-bill-products/view-bill-products.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit{

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view' ]
  dataSource:  any;
  responseMsg: any;
  searchKey :  any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _billService: BillService,
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
  this._billService.getBills()
  .subscribe((res: any) => {
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

applyFilter(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase()
}

onSearchClear(){
  this.searchKey = ''
  this.applyFilter('')
}

viewBill(item: any){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = {
    data: item
  }
  dialogConfig.width = '100%'
  const dialogRef = this._userDialog.open(ViewBillProductsComponent, dialogConfig)

  this._router.events.subscribe(()=>{
    dialogRef.close()
  })

}

downloadBill(item: any){
  this._ngxService.start()
  var data = {
    name: item.name,
    email: item.email,
    uuid: item.uuid,
    contactNumber: item.contactNumber,
    paymentMethod: item.paymentMethod,
    totalAmount: item.total,
    productDetails: item.productDetails
  }

  this._billService.getPdf(data)
  .subscribe((res: any) =>{
    saveAs(res, item.uuid+'.pdf')
    this._ngxService.stop()
  } )
}


}
