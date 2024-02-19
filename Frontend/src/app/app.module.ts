import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './services/snackbar.service';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { RouteGuardService } from './services/route-guard.service';
import { TokenInterceptor } from './services/token.interceptor';
import { MenuItems } from './shared/menu-items';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { CategoryComponent } from './components/category/category.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductComponent } from './components/product/product.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const ngxUiLoaderConfig : NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: 'orange',
  textPosition: "center-center",
  pbColor: 'orange',
  bgsColor: 'orange',
  fgsColor: 'orange',
  fgsType: SPINNER.foldingCube,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5

}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LogoutComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [
    UserService,
    SnackbarService,
    DashboardService,
    AuthService,
    RouteGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MenuItems
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
