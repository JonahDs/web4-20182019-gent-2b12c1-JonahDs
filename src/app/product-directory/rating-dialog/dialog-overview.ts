import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
  styleUrls: ["dialog-overview-example-dialog.scss"]
})
export class DialogOverviewExampleDialog {
  form = new FormControl(null, Validators.required);
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) {}
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
