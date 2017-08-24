import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <img src="/assets/images/loading.svg">
  `,
  styles: [`
    :host { display: block }
    img { display: block; margin: 50px auto; width: 100px;}
    `]
})
export class LoadingComponent {

}
