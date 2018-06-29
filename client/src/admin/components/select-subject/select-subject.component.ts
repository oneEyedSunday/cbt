import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styles: []
})
export class SelectSubjectComponent implements OnInit {
  @Output() selectSubject = new EventEmitter();
  @Input() subjects;
	pageTitle = " Create test | Choose Subject that the Test Belongs ";
	selectedSubj: any = null;
  constructor(private title: Title) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);
  }

  subjectSelected(subjectId: string){
    this.selectSubject.emit(subjectId)
  }


}
