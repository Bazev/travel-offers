import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: BehaviorSubject<string>

  constructor(private http: HttpClient) {
    this.token = new BehaviorSubject<string>('');
  }

  login(email:string, password:string): Promise<any> {
    return this.http
      .post('https://angular-eval.herokuapp.com/api/v1/login',
        {
          email,
          password,
        })
      .toPromise()
      .then((resp: any) => {
        this.token.next(resp.token);
      });
  }

  logout(): Promise<void> {
    return new Promise<void>(
      (res, rej) => {
        this.token.next('');
        res();
      }
    )
  }
}
