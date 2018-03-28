import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SubjectModel } from './../../../app/core/models/subject.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../app/services';
import { UtilsService } from './../../../app/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html'
})

export class TestCreateComponent implements OnInit{
	pageTitle = "Create Test | Waiting Test Questions";
	ready: boolean = false;
  @Input() subject_id;
  loading: boolean;
  creationWizard: string = "";
  error: boolean;
  submitting: boolean = false;
	questionCount: number;
	optionCount: number;
  subject: SubjectModel;
  testname: string;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);
    this.loading = false;
  }


  toggle(){
  	this.ready = !this.ready;
  }

  typeofForm(query: string): boolean {
    return query === this.creationWizard;
  }

  setWizard(event) {
    event.preventDefault()
    this.ready = true
  }

  public rigidFormParamsReady(): boolean {
    return (this.optionCount != null) && (this.questionCount != null)
  }

  setRigidFormsParams(event){
    this.optionCount = event.options
    this.questionCount = event.questions
    this.testname = event.testname
  }

  submitTestHandler($event){
    this.submitting = true;
    this.api.postTest$(this.subject_id, this.testname, $event)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
    )
  }

  private _handleSubmitSuccess(res){
    this.error = false;
    this.submitting = false;
    // Redirect to test page
    this.router.navigate(['/test', res._id]);
  }

  private _handleSubmitError(err){
    console.error(err);
    this.error = true;
    this.submitting = false;
  }

}
