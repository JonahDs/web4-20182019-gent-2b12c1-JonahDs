import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule,
   MatSidenavModule, MatIconModule, MatListModule,
   MatMenuModule, MatProgressSpinnerModule, MatCardModule, MatSliderModule, MatDialog, MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    MatSliderModule,
    MatDialogModule,
    ReactiveFormsModule

  ], exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    MatSliderModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
