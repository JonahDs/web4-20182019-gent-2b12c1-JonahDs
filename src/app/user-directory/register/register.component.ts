import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Register } from '../../classes/register';
import { Observable } from 'rxjs';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  data = false;
  registerform: FormGroup;
  massage: string;
  submitted = false;
  errorMessage: string;

  constructor(
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerform = this.formbuilder.group(
      {
        Username: ['', [Validators.required]],
        Firstname: ['', [Validators.required]],
        Lastname: ['', [Validators.required]],
        Password: ['',
          [Validators.required, Validators.minLength(6), Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$')]],
        ConfirmPassword: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]]
      },
      {
        validator: this.MustMatch('Password', 'ConfirmPassword')
      }
    );
  }

  MustMatch(controlString: string, confirmString: string) {
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

  onFormSubmit() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    const user = this.registerform.value;
    this.RegisterUser(user);
  }

  RegisterUser(register: Register) {
    this.loginService.register(
      register.Firstname, register.Lastname, register.Username, register.Email, register.Password).subscribe(() => {
      this.data = true;
      this.router.navigate(['/login']);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.errorMessage = `Error while trying to create user `;
      } else {
        this.errorMessage = `Error ${err.status} while trying to create user `;
      }
    });
  }
}
