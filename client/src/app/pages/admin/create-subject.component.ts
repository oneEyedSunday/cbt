import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './../../core/api.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { SubjectModel } from './../../core/models/subject.model';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styles: []
})
export class CreateSubjectComponent implements OnInit, OnDestroy {
  pageTitle = 'Create Subject';
  formSubject: SubjectModel;
  submitSubjectSub: Subscription;
  submitting: boolean;
  error: boolean;


  constructor(private api: ApiService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._setFormSubject();
  }

  private _setFormSubject(){
    this.formSubject = new SubjectModel(null);
  }

  onSubmit(){
    this.submitting = true;
    this.submitSubjectSub = this.api.postSubject$(this.formSubject)
    .subscribe(
      data => this._handleSubmitSuccess(data),
      err => this._handleSubmitError(err)
    );
  }

  private _handleSubmitSuccess(res){
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(res){
    console.error(res);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy(){
    if(this.submitSubjectSub){
      this.submitSubjectSub.unsubscribe();
    }
  }

}
