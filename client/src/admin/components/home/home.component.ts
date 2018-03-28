import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {
  @Input() Subjects : any[];
}
