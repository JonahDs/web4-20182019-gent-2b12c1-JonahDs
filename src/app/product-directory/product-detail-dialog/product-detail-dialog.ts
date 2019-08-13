import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'product-detail-dialog.html',
})
export class ProductDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    private _router: Router
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
}
