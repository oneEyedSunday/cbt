import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from '../core/helpers/jwt-helper';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private _jwt: JwtHelper = new JwtHelper();
  private redirectUrl: string;
  public message: string;
  userProfile: any;
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean> (this.loggedIn);

  constructor(private api: ApiService,
  private user: UserService,
private router: Router) {
    const lsProfile = localStorage.getItem('profile');

    if(this.tokenValid){
      this.userProfile = JSON.parse(lsProfile);
      this.setLoggedIn(true);
    } else if (!this.tokenValid && lsProfile){
      this.logout();
    }
  }

  get tokenValid(): boolean {
    return this.shouldIGetToken();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this._jwt.isTokenExpired();
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  login(redirect?: string){
    const _redirect = redirect ? redirect : this.router.url;
    localStorage.setItem('authRedirect', _redirect);
    this.router.navigate(['/login']);
  }

  logout(): Observable<string> | any{
    this.clear();
  }

  clear(): void {
    // perhaps be more specific
    localStorage.clear();
  }

  authenticate(email: string, password: string): Observable<string> {
    return this.api.login$(email,password)
    .do((token: string) => {
      localStorage.setItem('token', token);
      this.user.set(this._jwt.decodeToken());
      this._setSession(this._jwt.decodeToken());
    });
  }

  private _setSession(decoded: any){
    // check to ensure an actual profile was received
    localStorage.setItem('profile', JSON.stringify(decoded));
    this.userProfile = decoded;
    console.log(this.userProfile);
    this.setLoggedIn(true);
  }

  setLoggedIn(value: boolean){
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  shouldIGetToken(threshold_seconds: number = 120): boolean {
    if(this._jwt.getTokenExpirationDate() === null) return false;
    let expDate = this._jwt.getTokenExpirationDate().valueOf() - (threshold_seconds * 1000);
    return new Date().valueOf() > expDate;
  }

  retrieveToken(): Observable<string> {
    return this.api.token$()
    .map(res => <string>res)
    .do((token: string) => {
      this.clear();
      localStorage.setItem('token', token);
      this.user.set(this._jwt.decodeToken());
    });
  }
}
