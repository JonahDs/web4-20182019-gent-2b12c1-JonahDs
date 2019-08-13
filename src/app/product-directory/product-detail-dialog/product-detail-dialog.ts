import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'product-detail-dialog.html',
})
export class ProductDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
}
