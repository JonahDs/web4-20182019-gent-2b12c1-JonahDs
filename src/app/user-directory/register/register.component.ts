import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../classes/register';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  private _data = false;
  public registerform: FormGroup;
  public submitted = false;
  public errorMessage: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.registerform = this._formBuilder.group(
      {
        Firstname: ['', [Validators.required]],
        Lastname: ['', [Validators.required]],
        Username: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$'
            )
          ]
        ],
        ConfirmPassword: ['', [Validators.required]]
      },
      {
        validator: this.MustMatch('Password', 'ConfirmPassword')
      }
    );
  }

  private MustMatch(controlString: string, confirmString: string): void | any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlString];
      const matchingControl = formGroup.controls[confirmString];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f() {
    return this.registerform.controls;
  }

  public onFormSubmit(): void {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    const user = this.registerform.value;
    this.RegisterUser(user);
  }

  public RegisterUser(register: Register): void {
    this._loginService
      .register(
        register.Firstname,
        register.Lastname,
        register.Username,
        register.Email,
        register.Password
      )
      .subscribe(
        () => {
          this._data = true;
          this._router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to create user `;
          } else {
            this.errorMessage = `Error ${
              err.status
            } while trying to create user `;
          }
        }
      );
  }
}
