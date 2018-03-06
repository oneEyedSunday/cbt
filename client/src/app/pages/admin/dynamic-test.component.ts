import { Component, OnInit, Input, Output,OnDestroy, EventEmitter} from '@angular/core';
import { ApiService } from './../../core/api.service';
import {
  FormArray,
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
  Validators
 } from '@angular/forms'

@Component({
  selector: 'app-dynamic-test-create-form',
  templateUrl: './dynamic-test.component.html'
})

export class DynamicFormComponent implements OnInit, OnDestroy {
// validation - must require question to have at least two options

  form: FormArray;
  error: boolean;
  submitting:boolean;

  emptyOption: {
    text: string
  }

  constructor(
  	private api: ApiService,
    private fb: FormBuilder
  ) {
    this.form =
    // this.fb.group({
      // test:
      this.fb.array([
        new FormGroup({
          question: new FormControl('Question Text Goes here'),
          answer: new FormControl(null),
          options: new FormArray([
            this.createEmptyOption()
          ])
        })
      ])
    // })
  }

  ngOnInit() {

  }

  get Questions(): AbstractControl[] {
    // console.log(this.form.controls)
    return this.form.controls;
  }

  OptionsForQuestion(question: FormGroup) : AbstractControl[] {
    return (question.controls['options'] as FormArray).controls
  }

  addQuestion(){
    (this.form as FormArray).push(this.createEmptyQuestion())
  }

  removeQuestion(index: number){
    (this.form as FormArray).removeAt(index)
  }

  addOption(index: number){
    (this.form.controls[index].get('options') as FormArray).push(this.createEmptyOption())
  }

  // removeOption(question: number, index: number){
  //   (this.form.controls[question].get('options') as FormArray).removeAt(index)
  // }

  removeOption(question, optionIndex: number){
    (question.get('options') as FormArray).removeAt(optionIndex)
  }

  createEmptyQuestion(): FormGroup {
    return new FormGroup({
          question: new FormControl('Question Text Goes here'),
          answer: new FormControl(null),
          options: new FormArray([
            new FormGroup({
              text: new FormControl('Option Text')
            })
          ])
        })
  }

  createEmptyOption(): FormGroup {
      return new FormGroup({
        text : new FormControl('Option Text')
      })
  }

  setAnswer(question: FormGroup, answer: any) {
    question.controls['answer'] = answer.controls['text']
  }

  ngOnDestroy(){

  }
}
