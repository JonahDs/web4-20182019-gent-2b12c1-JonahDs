import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule,
   MatSidenavModule, MatIconModule, MatListModule, 
   MatMenuModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
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
    LayoutModule
  ]
})
export class MaterialModule { }
