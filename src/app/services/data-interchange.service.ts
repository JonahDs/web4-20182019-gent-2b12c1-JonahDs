import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataInterchangeService {

  private inputSource = new BehaviorSubject("Asus");
  input = this.inputSource.asObservable();

  constructor() { }

   changeOnInput(message: string){
    this.inputSource.next(message);
  }
}
