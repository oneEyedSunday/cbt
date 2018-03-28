import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ResultComponent } from './pages/result/result.component';
import * as fromComponents from './components';
import * as fromContainers from './containers';

const routes: Routes = [
  // split routes according to Modules
  // app module
  // Test module
  // Admin module
  {
    path: 'test',
    loadChildren: '../test/test.module#TestModule'
  },
  /*
  {
    path: 'result',
    component: ResultComponent
  },
  */
  {
    path: 'admin',
    loadChildren: '../admin/admin.module#AdminModule'
  },
  {
    path: 'login',
    component: fromComponents.LoginComponent
  },
  {
    path: '',
    component: fromContainers.HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
