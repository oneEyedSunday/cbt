import { Component, ChangeDetectionStrategy, OnInit  } from '@angular/core';
import { ApiService } from './../../../app/services';
import { ActivatedRoute , Router} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-tests',
  template: `
  <app-loading *ngIf="loading"></app-loading>

  <ng-template [ngIf]="!loading">
  <ng-template [ngIf]="tests && tests.length > 0 ">
  Tests for subject
  <section class="list-group">
    <div class="list-group-item navigatableListItem cursor-pointer" *ngFor="let test of tests" (click)="navigateTo(test._id)">
    {{test.title}}
    </div>
    <div class="list-group-item navigatableListItem" (click)="navigateTo((null), subjectId)">
    + Test
    </div>
  </section>
  </ng-template>

  <ng-template [ngIf]="tests.length == 0">
  <div class="alert">
  No tests for this subject
  <div class="list-group-item navigatableListItem" (click)="navigateTo((null), subjectId)">
  + Test
  </div>
  </div>
  </ng-template>

  <div class="alert alert-danger" *ngIf="error">
  An error occured
  </div>
  </ng-template>

  `,

})
export class TestsComponent implements OnInit {
  tests;
  subjectId;
  routeSub: Subscription;
  loading: boolean;
  // loaded: boolean
  error: boolean;
  testsSub: Subscription;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.subjectId = params['id']
    })
    this._getTests()
  }

  navigateTo(link?: string, subjectId?:string) {
    if (link) {
      this.router.navigate(['/admin/test', link])
    } else if (subjectId){
      this.router.navigate(['/admin/test'], {queryParams: {'subjectId': subjectId}})
    }
  }


  private _getTests() {
    this.loading = true;
    // Get future, public events
    this.testsSub = this.api
      .getTestsForSubject$(this.subjectId)
      .subscribe(
        res => {
          this.tests = res;
          console.log(res)
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
