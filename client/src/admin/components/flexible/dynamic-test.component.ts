import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { ApiService } from './../../../app/services';
import {
  FormArray,
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
  Validators
 } from '@angular/forms'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-dynamic-test-create-form',
  templateUrl: './dynamic-test.component.html'
})

export class DynamicFormComponent implements OnInit, OnChanges {
// validation - must require question to have at least two options
  @Input() questions;
  @Input() test;
  @Input() options;
  @Input() formType;
  @Input() submitProgress: boolean = false;
  @Output() submitTest = new EventEmitter();
  // submitSub: Subscription;
  form: FormArray;
  error: boolean;
  submissionInProgress:boolean;
  buttonText: string = "Create Test";


  constructor(
  	private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    if (this.test !== null && this.test !== undefined ){
      this.createTestFromTemplate(this.test)
      this.buttonText = "Edit Test"
    } else {
      if(this.formType === 'RIGID'){
        this.createFormWithSize()
      } else {
        this.form = this.fb.array([
            new FormGroup({
              question: new FormControl('Question Text Goes here', [Validators.required]),
              answer: new FormControl(null, [Validators.required]),
              options: new FormArray([
                this.createOption()
              ])
            })
          ])
      }
    }
  }

  createFormWithSize(){
    const questions = []
    for (let i = 0; i < this.questions; i++){
      questions.push(this.createEmptyQuestionWithAnswers())
    }
    this.form = this.fb.array(questions)
  }

  createTestFromTemplate(questions) {
    console.log(questions)
    let questionsArray = []
    for (let i = 0; i < questions.length; i++){
        questionsArray.push(this.createQuestionFromJson(questions[i]))
    }

    this.form = this.fb.array(questionsArray)
    console.log(this.form)
  }

  createQuestionFromJson(question): FormGroup{
    const options = []
    for (let i = 0; i < question.options.length; i++ ){
      options.push(this.createOption(question.options[i].text))
    }
    return new FormGroup({
      question: new FormControl(question.text, [Validators.required]),
      answer: new FormControl(question.answer, [Validators.required]),
      options: new FormArray(options)
    })
  }
  get Questions(): AbstractControl[] {
    // console.log(this.form.controls)
    return this.form.controls;
  }

  OptionsForQuestion(question: FormGroup) : AbstractControl[] {
    let options = (question.controls['options'] as FormArray).controls
    return options
  }

  addQuestion(){
    (this.form as FormArray).push(this.createEmptyQuestion())
  }

  removeQuestion(index: number){
    (this.form as FormArray).removeAt(index)
  }

  addOption(index: number){
    (this.form.controls[index].get('options') as FormArray).push(this.createOption())
  }

  // removeOption(question: number, index: number){
  //   (this.form.controls[question].get('options') as FormArray).removeAt(index)
  // }

  removeOption(question, optionIndex: number){
    (question.get('options') as FormArray).removeAt(optionIndex)
  }

  createEmptyQuestion(): FormGroup {
    return new FormGroup({
          question: new FormControl('Question Text Goes here', [Validators.required]),
          answer: new FormControl(null, [Validators.required]),
          options: new FormArray([
            new FormGroup({
              text: new FormControl('Option Text', [Validators.required])
            })
          ])
        })
  }

  createEmptyQuestionWithAnswers(): FormGroup {
    const options = []
    for (let i = 0; i < this.options; i ++){
      options.push(this.createOption())
    }

    return new FormGroup({
      question: new FormControl('Question Text Goes here', [Validators.required]),
      answer: new FormControl(null, [Validators.required]),
      options: new FormArray(options)
    })
  }

  createOption(option?): FormGroup {
      return new FormGroup({
        text : new FormControl(option ? option : 'Option Text', [Validators.required])
      })
  }

  setAnswer(question: FormGroup, answer: any) {
    question.controls['answer'].setValue(answer.value.text)
    console.log(question.value)
  }

  createTest(){
    if(this.form.valid){
      this.submitTest.emit(this.form.value)
    } else {
      alert("Your test has errors")
      console.log(this.form.errors)
      this.form.controls.map(control => {
        console.log(control.errors)
      })
    }
  }

  isCurrentAnswer(question: FormGroup, option: FormGroup): boolean {
    if (question.value.answer == option.value.text) return true
    return false;
  }

  ngOnChanges(changes: SimpleChanges){
    if (!this.test) {
      this.submissionInProgress =  changes['submitProgress'].currentValue
    }
  }
}
