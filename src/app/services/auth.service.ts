import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    auth: boolean = false;
    
    token: string = '';

    constructor(private routerUrl: Router) {
    }

    login(user: any): boolean {

      if(user.username === 'adm' && user.password === '123456')
      {
        localStorage.setItem('user', user.username);
        localStorage.setItem('auth', 'true');
        this.token = environment.token;
        //console.log(this.token);
        this.auth = true;
      }
      else{
        this.auth = false;
        this.token = '';
      }
        return this.auth;
    }

    logout(): void {
        this.auth = false;
        this.token = '';
        const clean: any = null;
        localStorage.setItem('user', clean);
        localStorage.setItem('auth', clean);
        this.routerUrl.navigateByUrl('');
    }

    public isAuthenticated(): boolean {
      return this.auth;
    }
}