import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { ENV } from './env.config';
import { SubjectModel } from './models/subject.model';
import { QuestionModel } from './models/question.model';
import { TestModel } from './models/test.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // GET list of Tests

  getTests$(): Observable<TestModel[]> {
    return this.http.get(`${ENV.BASE_API}test/list`).catch(this._handleError);
  }

  getTestById$(id: string): Observable<TestModel> {
    return this.http.get(`${ENV.BASE_API}test/${id}`).catch(this._handleError);
  }

  getSubjectById$(id: string): Observable<SubjectModel> {
    return this.http.get(`${ENV.BASE_API}subjects/${id}`).catch(this._handleError);
  }

  getSubjects$(): Observable<SubjectModel[]> {
    return this.http.get(`${ENV.BASE_API}subjects`).catch(this._handleError);
  }

  postSubject$(subject: SubjectModel): Observable<SubjectModel> {
    return this.http.post(`${ENV.BASE_API}subjects/new`, subject).catch(this._handleError);
  }

  postTest$(testname: string, questions: QuestionModel[]): Observable<any>{
    return this.http.post(`${ENV.BASE_API}test/new`, {title: testname, questions: questions}).catch(this._handleError);
  }

  markTest$(id: string, choices: string[]):Observable<any>{
    return this.http.post(`${ENV.BASE_API}test/mark/${id}`, choices).catch(this._handleError);
  }

  logout$(): Observable<string> {
    console.log("api tryna logout");
    return this.http.post(`${ENV.BASE_API}users/logout`, null).catch(this._loginError);
  }

  login$(email: string, password: string): Observable<string> {
    return this.http.post(`${ENV.BASE_API}users/login`, {email: email, password: password}).catch(this._loginError);
  }

  token$():Observable<string> {
    return this.http.get(`${ENV.BASE_API}users/token`).catch(this._handleError);
  }

  private _loginError(err: HttpErrorResponse | any){
    if(err instanceof HttpErrorResponse) {
      if (err.status === 401){
        return Observable.throw("Invalid credentials");
      }
    }
    return Observable.throw(err.message || 'Error unable to complete');
  }
  private _handleError(err: HttpErrorResponse | any){
    const errorMsg = err.message || 'Error unable to complete request.';
    return Observable.throw(errorMsg);
  }
}
