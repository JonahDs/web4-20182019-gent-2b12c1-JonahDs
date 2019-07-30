import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, Observer } from 'rxjs';
import { nextContext } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DataInterchangeService {
  private inputSource = new BehaviorSubject('Asus');
  input = this.inputSource.asObservable();

  private cart$ = new Subject<string>();

  constructor() {}

  changeOnInput(message: string) {
    this.inputSource.next(message);
  }

  addToCart(productnaam: string) {
    this.cart$.next(productnaam);
  }
}
