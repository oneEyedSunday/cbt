import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';
import * as fromComponents from './components';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.HomeComponent
  },
  {
    path: 'subjects/tests/:id',
    component: fromContainers.TestsComponent
  },
  {
    path: 'create-subject',
    component: fromContainers.CreateSubjectComponent
  },
  {
    path: 'test',
    component: fromContainers.TestDetailsComponent
  },
  {
    path: 'test/:id',
    component: fromContainers.TestDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
