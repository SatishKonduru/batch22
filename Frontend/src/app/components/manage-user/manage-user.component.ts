import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit{
displayedColumns : string[] = ['name', 'email','contactNumber', 'status']
dataSource: any;
responseMsg: any;
searchKey: any;

@ViewChild(MatPaginator) paginator : MatPaginator
constructor(
  private _ngxService:  NgxUiLoaderService,
  private _userService: UserService,
  private _snackbar: SnackbarService
){}

ngOnInit(): void {
    this._ngxService.start()
    this.tableData()
}

tableData(){
  this._userService.getUsers().subscribe((res: any) => {
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

onChange(status:any , id: any){
  var data = {
    status: status.toString(),
    id: id
  }

  this._userService.update(data).subscribe((res: any) => {
    this._ngxService.stop()
    this.responseMsg = res?.message
    this._snackbar.openSnackbar(this.responseMsg, 'success')
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




}
