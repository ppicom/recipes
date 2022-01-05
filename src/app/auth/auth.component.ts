import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, FirebaseAuthData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  inLogin = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.error = null

    let authObs: Observable<FirebaseAuthData>;

    if (this.inLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    this.isLoading = true;
    authObs.subscribe({
      next: authData => {
        console.log(authData);
        this.isLoading = false
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.isLoading = false
      }
    });
  }
}
