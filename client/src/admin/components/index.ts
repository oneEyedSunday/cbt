import { HomeComponent } from './home/home.component';
import { SelectSubjectComponent } from './select-subject/select-subject.component';
import { DynamicFormComponent } from './flexible/dynamic-test.component';
// import { TestFormComponent } from './rigid/test-form.component';
import { TestCreateMetadataComponent } from './test-create-metadata/test-create-metadata.component';
import { DeleteTestComponent } from './update-test/delete-test.component';
import { EditTestComponent } from './update-test/edit-test.component';

export const components: any[] = [
  HomeComponent,
  SelectSubjectComponent,
  DynamicFormComponent,
  // TestFormComponent,
  TestCreateMetadataComponent,
  DeleteTestComponent,
  EditTestComponent
];

export * from './home/home.component';
export * from './select-subject/select-subject.component';
export * from './flexible/dynamic-test.component';
// export * from './rigid/test-form.component';
export * from './test-create-metadata/test-create-metadata.component';
export * from './update-test/delete-test.component';
export * from './update-test/edit-test.component';
