import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from 'src/app/shared/menu-items';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  token: any;
  tokenPayload: any
  constructor(public menuItems: MenuItems){
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token')
      this.tokenPayload = jwtDecode(this.token)
    }
  }

}
