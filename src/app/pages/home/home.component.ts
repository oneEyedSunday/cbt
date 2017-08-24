import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { TestModel } from './../../core/models/test.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  testListSub: Subscription;
  testList: TestModel[];
  loading: boolean;
  error: boolean;


  constructor(
    public utils: UtilsService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this._getTestList();
  }

  private _getTestList(){
    this.loading = true;
    this.testListSub = this.api.getTests$().subscribe(
      res => {
        this.testList = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy(){
    this.testListSub.unsubscribe();
  }

}
