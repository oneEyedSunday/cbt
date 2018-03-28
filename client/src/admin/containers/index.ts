import { TestCreateComponent } from './test-create/test-create.component';
import { HomeComponent } from './home/home.component';
import { TestsComponent } from './tests/tests.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';

export const containers: any[] = [
  TestCreateComponent,
  HomeComponent,
  TestsComponent,
  TestDetailsComponent,
  CreateSubjectComponent
];

export * from './test-create/test-create.component';
export * from './home/home.component';
export * from './tests/tests.component';
export * from './test-details/test-details.component';
export * from './create-subject/create-subject.component';
