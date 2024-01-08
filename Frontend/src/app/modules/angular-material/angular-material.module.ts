import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';



const materialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
]
@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class AngularMaterialModule { }
