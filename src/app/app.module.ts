import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductModule } from './product-directory/product.module';
import { UserModule } from './user-directory/user.module';
import { GestureConfig } from '@angular/material';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    NavigationComponent,
    PagenotfoundComponent,
  ],
  imports: [
    ProductModule,
    MaterialModule,
    UserModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [ {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
