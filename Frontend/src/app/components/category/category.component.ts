import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categoryForm: any  = FormGroup
  onAddCategory = new EventEmitter()
  onEditCategory = new EventEmitter()
  dialogAction : any = "Add"
  action : any = "Add"
  responseMsg: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData ,
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _dialogRef: MatDialogRef<CategoryComponent>,
    private _snackbar: SnackbarService
  ){}

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      name: [null, [Validators.required]]
    })
    if(this.dialogData.action == 'Edit'){
      this.dialogAction = 'Edit'
      this.action = 'Update'
      this.categoryForm.patchValue(this.dialogData.data)
    }

  }

  handleSubmit(){

    if(this.dialogAction == 'Edit'){
      this.edit()
    }
    else{
      this.add()
    }

  }

  edit(){
    var formData = this.categoryForm.value
    var data = {
      id: this.dialogData.data.id,
      name: formData.name
    }
    this._categoryService.update(data)
    .subscribe((res: any) => {
      this._dialogRef.close()
      this.onEditCategory.emit()
      this.responseMsg = res?.message
      this._snackbar.openSnackbar(this.responseMsg, 'success')
    },
    (err: any) => {
      this._dialogRef.close()
      if(err.error?.message){
        this.responseMsg = err.error?.message
      }
      else{
        this.responseMsg = globalProperties.genericError
      }
      this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
    })
  }
  add(){
    var formData = this.categoryForm.value
    var data = {
      name: formData.name
    }
    this._categoryService.add(data)
    .subscribe((res: any) => {
      this._dialogRef.close()
      this.onAddCategory.emit()
      this.responseMsg = res?.message
      this._snackbar.openSnackbar(this.responseMsg, 'success')
    },
    (err: any) => {
      this._dialogRef.close()
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
