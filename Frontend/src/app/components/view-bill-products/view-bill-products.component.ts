import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.css']
})
export class ViewBillProductsComponent implements OnInit{
dispalyedColumns : string[] = ['name', 'category', 'price', 'quantity', 'total']
dataSource: any ;
data: any;

constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
            public dialogRef: MatDialogRef<ViewBillProductsComponent>){}

ngOnInit(): void {
    this.data = this.dialogData.data
    this.dataSource = JSON.parse(this.data.productDetails)
}

onClose(){
  this.dialogRef.close()
}
}
