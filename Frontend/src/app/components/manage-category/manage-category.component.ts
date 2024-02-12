import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';
import { CategoryComponent } from '../category/category.component';

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

@ViewChild(MatPaginator) paginator : MatPaginator;
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
  this.dataSource.paginator = this.paginator
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


addCategory(){
const dialogConfig = new MatDialogConfig()
dialogConfig.data = {action: 'Add'}
dialogConfig.width = '300px'
dialogConfig.disableClose= true;
dialogConfig.position = {
  top: '100px',
  left: '48rem'
}
const dialogRef = this._userDialog.open(CategoryComponent, dialogConfig)
this._router.events.subscribe( () => {
  dialogRef.close()
})

// dialogRef.componentInstance.onAddCategory.subscribe((res) => {
//   this.tableData()
// })

}
applyFilter(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase()
}

onSearchClear(){
  this.searchKey = ''
  this.applyFilter('')
}


}
