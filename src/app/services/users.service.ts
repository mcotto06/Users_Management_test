import { Injectable } from '@angular/core';
import { Dictionary } from '../users/users-list/users-list.component';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.url

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  all(options?: Dictionary<string>): Observable<any> {
    if (this.authService.token === '') {
      this.authService.logout();
    }

    let params = new HttpParams();
    if (options) {
      for (let key in options) {
        params = params.append(key, options[key]);
      }
    }
    
    return this.http.get(this.baseUrl, { params: params });
  }

  get(id: number): Observable<any> {
    if (this.authService.token === '') {
      this.authService.logout();
    }

    return this.http.get(this.baseUrl + "/" + id);
  }

  insert(user: UserModel): Observable<any> {    
    if (this.authService.token === '') {
      this.authService.logout();
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: this.authService.token
    }

    return this.http.post(this.baseUrl, {
      name: user.name,
      gender: user.gender,
      email: user.email,
      status: user.status
    }, {headers});
  }

  update(id: number, user: UserModel): Observable<any> {    
    if (this.authService.token === '') {
      this.authService.logout();
    }
    
    const headers = {
      'Content-Type': 'application/json',
      authorization: this.authService.token
    }

    return this.http.put(this.baseUrl + '/' + id, user, {headers});
  }

  delete(user: UserModel): Observable<any> {
    if (this.authService.token === '') {
      this.authService.logout();
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: this.authService.token
    }

    return this.http.delete(this.baseUrl + "/" + user.id, {headers});
  }
}
