import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { ENV } from '../core/env.config';
import { SubjectModel } from '../core/models/subject.model';
import { QuestionModel } from '../core/models/question.model';
import { TestModel } from '../core/models/test.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // GET list of Tests

  getTests$(): Observable<TestModel[]>{
    return this.http.get<TestModel[]>(`${ENV.BASE_API}test`).pipe(catchError(this._handleError));
  }

  getTestById$(id: string): Observable<TestModel> {
    return this.http.get<TestModel>(`${ENV.BASE_API}test/${id}`).pipe(catchError(this._handleError));
  }

  getSubjectById$(id: string): Observable<SubjectModel> {
    return this.http.get<SubjectModel>(`${ENV.BASE_API}subjects/${id}`).pipe(catchError(this._handleError));
  }

  getSubjects$(): Observable<SubjectModel[]> {
    return this.http.get<SubjectModel[]>(`${ENV.BASE_API}subjects`).pipe(catchError(this._handleError));
  }

  getTestsForSubject$(id: string): Observable<TestModel[]> {
    return this.http.get<TestModel[]>(`${ENV.BASE_API}subjects/${id}/tests`).pipe(catchError(this._handleError));
  }

  postSubject$(subject: SubjectModel): Observable<SubjectModel> {
    return this.http.post<SubjectModel>(`${ENV.BASE_API}subjects/new`, subject).pipe(catchError(this._handleError));
  }

  postTest$(subjectId: string, testname: string, questions: QuestionModel[]): Observable<any>{
    return this.http.post(`${ENV.BASE_API}test/new`, {
      subjectId: subjectId,
      title: testname,
      questions: questions
    }).pipe(catchError(this._handleError));
  }

  markTest$(id: string, choices: string[]):Observable<any>{
    return this.http.post(`${ENV.BASE_API}test/mark/${id}`, choices).pipe(catchError(this._handleError));
  }

  logout$(): Observable<string> {
    console.log("api tryna logout");
    return this.http.post<string>(`${ENV.BASE_API}users/logout`, null).pipe(catchError(this._loginError));
  }

  login$(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${ENV.BASE_API}users/login`, {email: email, password: password}).pipe(catchError(this._loginError));
  }

  token$():Observable<string> {
    return this.http.get<string>(`${ENV.BASE_API}users/token`).pipe(catchError(this._handleError));
  }

  private _loginError(err: HttpErrorResponse | any){
    if(err instanceof HttpErrorResponse) {
      if (err.status === 401){
        return throwError("Invalid credentials");
      }
    }
    return throwError(err.message || 'Error unable to complete');
  }
  private _handleError(err: HttpErrorResponse | any){
    const errorMsg = err.message || 'Error unable to complete request.';
    return throwError(errorMsg);
  }
}
