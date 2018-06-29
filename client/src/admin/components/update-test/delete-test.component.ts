import { Component, OnDestroy, Input } from '@angular/core';
import { TestModel } from './../../../app/core/models/test.model';
import { Subscription } from 'rxjs';
import { ApiService } from './../../../app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-test',
  templateUrl: './delete-test.component.html'
})

export class DeleteTestComponent implements OnDestroy {
  @Input() test: TestModel;
  confirmDelete: string;
  deleteSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  removeTest(){
    this.submitting = true;
    // DELETE event by ID
    /*
    this.deleteSub = this.api
      .deleteEvent$(this.event._id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          console.log(res.message);
          // If successfully deleted event, redirect to Admin
          this.router.navigate(['/admin']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
      */
  }

  ngOnDestroy(){
    if (this.deleteSub){
      this.deleteSub.unsubscribe()
    }
  }
}
