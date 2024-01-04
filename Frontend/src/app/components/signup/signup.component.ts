import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from 'src/app/shared/globalProperties';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
registerForm: any = FormGroup
constructor(private _formBuilder: FormBuilder){}
ngOnInit(): void {
  this.registerForm = this._formBuilder.group({
    username: [null, [Validators.required, Validators.pattern(globalProperties.nameRegx)]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    cnumber: [null, [Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]]
  })
}


onRegister(){
  // console.log("Values: ", this.registerForm.value)
}




}
