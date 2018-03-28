import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
// import * as fromGuards  from "./guards";

const routes: Routes = [
  {
    path: ":id",
    // canActivate: [fromGuards.ProductExistsGuards],
    component: TestComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TestRoutingModule { }
