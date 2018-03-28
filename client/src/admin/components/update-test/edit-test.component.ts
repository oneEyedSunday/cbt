import { Component, OnInit, Input } from '@angular/core';
import { TestModel } from './../../../app/core/models/test.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html'
})

export class EditTestComponent {
  @Input() test: TestModel;
  constructor(
  ) {}
}
