import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from "./test-routing.module";
import { Title } from '@angular/platform-browser';
import { TestComponent } from './test.component';
import { MiscModule } from '../misc/misc.module';

// components
// import * as fromComponents from "./components";
// import * as fromContainers from "./containers";
import * as fromServices from "../app/services";
// import * as fromGuards from "./guards";


@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    MiscModule
  ],
  providers: [...fromServices.services, Title],
  declarations: [
    TestComponent
  ],
  exports: [
    TestComponent
  ]
})
export class TestModule { }
