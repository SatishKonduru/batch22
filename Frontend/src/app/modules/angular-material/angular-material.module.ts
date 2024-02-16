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
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



const materialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSlideToggleModule
]
@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class AngularMaterialModule { }
