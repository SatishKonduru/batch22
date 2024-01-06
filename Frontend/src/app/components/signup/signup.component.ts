import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
registerForm: any = FormGroup
public responseMsg : any = ''
constructor(
  private _formBuilder: FormBuilder,
  private _ngxService: NgxUiLoaderService,
  private _useService: UserService,
  private _dialogRef: MatDialogRef<SignupComponent>
  ){}
ngOnInit(): void {
  this.registerForm = this._formBuilder.group({
    username: [null, [Validators.required, Validators.pattern(globalProperties.nameRegx)]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    cnumber: [null, [Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]]
  })
}


onRegister(){
  this._ngxService.start()
  var formData = this.registerForm.value;
  var data = {
    username: formData.username,
    cnumber: formData.cnumber,
    email: formData.email,
    password: formData.password
  }
  this._useService.signup(data)
  .subscribe( (res: any) => {
    this._ngxService.stop()
    this._dialogRef.close()
    this.responseMsg = res?.message
    console.log("Response Message: ", this.responseMsg)
  }, (err: any) => {
    console.log(err)
  })
}




}
