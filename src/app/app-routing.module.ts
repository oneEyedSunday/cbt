import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateSubjectComponent } from './pages/admin/create-subject.component';
import { CreateTestComponent } from './pages/admin/create-test/create-test.component';
import { TestCreateComponent } from './pages/admin/test-create/test-create.component';

const routes: Routes = [
  {
    path: 'test/:id',
    component: TestComponent,
    children:[]
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'create-subject',
        component: CreateSubjectComponent
      },
      {
        path: 'create-test',
        component: CreateTestComponent
      },
      {
        path: 'test/new/:id',
        component: TestCreateComponent
      }
    ]
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

