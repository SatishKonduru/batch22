import { Injectable } from "@angular/core"

export interface Menu {
  state: string,
  name: string,
  icon: string,
  role: string
}

const MENU_ITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    role: ''
  },
  {
    state: 'category',
    name: 'Category',
    icon: 'category',
    role: 'admin'
  },
  {
    state: 'product',
    name: 'Product',
    icon: 'inventory_2',
    role: 'admin'
  },
  {
    state: 'order',
    name: 'Order',
    icon: 'list_alt',
    role: ''
  },
  {
    state: 'bill',
    name: 'View Bill',
    icon: 'import_contacts',
    role: ''
  }
]
@Injectable()
export class MenuItems{
  getMenuItems(): Menu[] {
    return MENU_ITEMS
  }
}
