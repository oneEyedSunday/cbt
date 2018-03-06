import { Injectable } from '@angular/core';

@Injectable()
export class ResultService {
  result: number;
  constructor() { }

  set(score: number){
    this.result = score;
  }

  clear(){
    delete this.result;
  }

  get(){
    return this.result;
  }
}
