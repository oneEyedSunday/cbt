import { Injectable } from '@angular/core';
import { IUser } from '../core/interfaces/iuser';
@Injectable()
export class UserService {
  private user: IUser;
  constructor() { }

  set(user: IUser): void {
    this.user = user;
  }

  get(): IUser {
    return this.user;
  }

  delete(): void {
    this.user = undefined;
  }
}
