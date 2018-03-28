import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() navToggled = new EventEmitter();
  navOpen = false;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
  	// if nav is open after routing, close import  = require("");
  	this.router.events
  	.filter(event => event instanceof NavigationStart && this.navOpen)
  	.subscribe(event => this.toggleNav());
  }

  toggleNav(){
  	this.navOpen = !this.navOpen;
  	this.navToggled.emit(this.navOpen);
  }




}
