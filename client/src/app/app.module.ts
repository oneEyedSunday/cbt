import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MiscModule } from '../misc/misc.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';


@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MiscModule
  ],
  providers: [
    Title,
    ...fromServices.services
  ],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule { }
