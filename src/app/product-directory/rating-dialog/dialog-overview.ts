import { Component, inject, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.scss']
})
export class DialogOverviewExampleDialogComponent {
  form = new FormControl(null, Validators.required);
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
}
