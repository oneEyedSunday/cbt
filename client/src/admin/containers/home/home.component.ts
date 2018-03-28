import { Component, ChangeDetectionStrategy, OnInit  } from '@angular/core';
import { ApiService } from './../../../app/services';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-landing',
  template: `
  <app-loading *ngIf="loading"></app-loading>
  <app-admin-home *ngIf="!loading" [Subjects]="subjects"></app-admin-home>
  `
})
export class HomeComponent implements OnInit {
  subjects;
  loading: boolean;
  // loaded: boolean
  error: boolean;
  subjectsSub;
  constructor(private api: ApiService){}

  ngOnInit(){
    this._getSubjects()
  }

  private _getSubjects() {
    this.loading = true;
    // Get future, public events
    this.subjectsSub = this.api
      .getSubjects$()
      .subscribe(
        res => {
          this.subjects = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }
}
