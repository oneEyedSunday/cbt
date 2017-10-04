import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './core/loading.component';

import { ApiService } from './core/api.service';
import { UtilsService } from './core/utils.service';
import { TestComponent } from './pages/test/test.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateSubjectComponent } from './pages/admin/create-subject.component';
import { CreateTestComponent } from './pages/admin/create-test/create-test.component';
import { TestCreateComponent } from './pages/admin/test-create/test-create.component';
import { TestFormComponent } from './pages/admin/test-form.component';
import { ResultComponent } from './pages/result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    TestComponent,
    AdminComponent,
    CreateSubjectComponent,
    CreateTestComponent,
    TestCreateComponent,
    TestFormComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    UtilsService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
