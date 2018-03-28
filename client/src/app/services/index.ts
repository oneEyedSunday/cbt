import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ResultService } from './result.service';
import { UserService } from './user.service';
import { UtilsService } from './utils.service';

export const services: any[] = [
  ApiService,
  AuthService,
  ResultService,
  UserService,
  UtilsService
];

export * from './api.service';
export * from './auth.service';
export * from './result.service';
export * from './user.service';
export * from './utils.service';
