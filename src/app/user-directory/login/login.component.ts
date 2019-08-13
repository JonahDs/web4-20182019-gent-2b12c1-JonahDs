import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  model: any = {};
  errorMessage: string;

  loginCredential: string;
  password: string;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    sessionStorage.removeItem('LoginCredential');
    sessionStorage.clear();
  }

  login() {
    if (!this.loginCredential || !this.password) {
      this.errorMessage = 'LoginCredential or Password is left blank';
      return;
    }

    this.loginService.login(this.loginCredential, this.password).subscribe(
      value => {
        if (value) {
          if (this.loginService.redirectUrl) {
            this.router.navigateByUrl(this.loginService.redirectUrl);
            this.loginService.redirectUrl = undefined;
          } else {
            this.router.navigate(['/product']);
          }
        } else {
          this.errorMessage = 'Could not login';
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMessage = `Error while trying to login user ${
            this.loginCredential
          } `;
        } else {
          this.errorMessage = `Error ${err.status} while trying to login user ${
            this.loginCredential
          } `;
        }
      }
    );
  }
}
