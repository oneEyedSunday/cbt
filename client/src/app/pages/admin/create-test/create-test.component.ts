import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../../core/api.service';
import { SubjectModel } from './../../../core/models/subject.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styles: []
})
export class CreateTestComponent implements OnInit {
	pageTitle = " Create test | Choose Subject";
	subjects: SubjectModel[];
	subjectsSub: Subscription;
	selectedSubj: any = null;
  constructor(private title: Title, private api: ApiService) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);
  	this.subjectsSub = this.api.getSubjects$().subscribe(data => {this.subjects = data});
  }

  ngOnDestroy(){
  	if(this.subjectsSub){
  		this.subjectsSub.unsubscribe();
  	}
  }

}
