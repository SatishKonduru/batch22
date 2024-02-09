import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit{
displayedColumns : string[] = ['name','edit']
dataSource: any;
responseMsg: any;
searchKey: string = ''
constructor(
  private _categoryService: CategoryService,
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
this._categoryService.getCategories()
.subscribe( (res: any) => {
  this._ngxService.stop()
  this.dataSource = new MatTableDataSource(res)
},(err: any) => {

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

}
