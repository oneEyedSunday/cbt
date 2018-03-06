import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultService } from './../../core/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: []
})
export class ResultComponent implements OnInit, OnDestroy {
  result;
  constructor(private resultservice: ResultService) { }

  ngOnInit() {
    this.result = this.resultservice.get();
  }

  ngOnDestroy(){
    this.resultservice.clear();
  }

}
