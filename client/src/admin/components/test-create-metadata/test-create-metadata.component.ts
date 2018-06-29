import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-create-metadata',
  templateUrl: './test-create-metadata.component.html',
})
export class TestCreateMetadataComponent implements OnInit {
  @Output() back = new EventEmitter();
  @Output() rigidParamsSet = new EventEmitter();
  @Input() formType;
  @Input() test;
	pageTitle = " Create test | Set Test metadata ";
  optionCount;
  questionCount;
  testname: string;

  constructor(private title: Title) { }

  ngOnInit() {
    if (!this.test){
  	   this.title.setTitle(this.pageTitle);
    } else {
      this.testname = this.test
    }
  }

  goBack(){
    this.back.emit()
  }

  showRigidForm(){
    this.rigidParamsSet.emit({
      options: this.optionCount,
      questions: this.questionCount,
      testname: this.testname
    })
  }

  shouldDisplay(condition : string): boolean {
    return this.formType == condition
  }


}
