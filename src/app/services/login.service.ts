import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { from, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Register } from "../classes/register";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  private readonly _tokenKey = "currentUser";
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string;
  
  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  }

  login(LoginCredential: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account`,
        { LoginCredential: LoginCredential, password },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(LoginCredential);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(
    firstname: string,
    lastname: string,
    username:string,
    email: string, 
    Password: string
   
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          email,
          firstname,
          lastname,
          username,
          Password,
          PasswordConfirmation: Password
        },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem("currentUser");
      this._user$.next(null);
    }
  }

  checkUserNameAvailable = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
  };

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }
}



function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split(".")[1];
  const base64 = base64Token.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}
