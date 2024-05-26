import { UserService } from './../../services/user.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoggein = localStorage.getItem('tokenData');

  _loginForm: FormGroup;
  router = inject(Router);

  constructor(private usrService: UserService) {
    if (this.isLoggein) {
      this.router.navigateByUrl('dashboard');
    }

    this._loginForm = new FormGroup({
      EmailId: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this._loginForm.valid) {
      this.usrService.onLogin(this._loginForm.value).subscribe(
        (res: any) => {
          if (res.result) {
            localStorage.setItem('tokenData', JSON.stringify(res.data));
            this.router.navigateByUrl('dashboard');
          } else {
            alert(res.message);
          }
        },
        (error) => {
          console.log(error);
          alert('wrong credentials');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  get email() {
    return this._loginForm.get('EmailId');
  }

  get password() {
    return this._loginForm.get('Password');
  }
}
