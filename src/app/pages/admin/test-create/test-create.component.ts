import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SubjectModel } from './../../../core/models/subject.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { UtilsService } from './../../../core/utils.service';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss']
})

export class TestCreateComponent implements OnInit, OnDestroy {
	pageTitle = "Create Test | Waiting Test Questions";
	ready: boolean = false;
  loading: boolean;
  error: boolean;
	questionCount: number;
	optionCount: number;
  subject_id: string;
  routeSub: Subscription;
  subjectSub: Subscription;
  subject: SubjectModel;
  testname: string;

  constructor(private title: Title,
    private router: ActivatedRoute,
    private api: ApiService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);
    this.routeSub = this.router.params.subscribe(
      param => {
        this.subject_id = param["id"];
        this._getSubject();
      }
    );
  }

  private _getSubject(){
    this.loading = true;
    this.subjectSub = this.api.getSubjectById$(this.subject_id)
    .subscribe(res => {
      this.subject = res;
      console.log("Subject fetched from api is:" + this.subject.name);
      this.loading = false;
    },
    err => {
      console.error(err);
      this.loading = false;
      this.error = true;
    });
  }

  fillArray(qty){
  	return Array(qty).fill(0).map((e,i)=> i+ 1);
  }

  onSubmit(){
  	this.toggle();
  }

  toggle(){
  	this.ready = !this.ready;
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.subjectSub.unsubscribe();
  }

}
