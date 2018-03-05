import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public message: string;
    public loginForm;
    private loading: boolean = false;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.message = this.auth.message || "";
    this.auth.clear();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private submitted(){
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.auth.authenticate(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .subscribe(()=> {
      this.loading = false;
      let to: string = this.auth.getRedirectUrl() || '/';
      this._router.navigate([to]);
    },
  (error)=> {
    this.loading = false;
    this.message = error;
    console.error("auth error", error);
  });
  }

}
