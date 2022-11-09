import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService,
    private routerUrl: Router) { }

  ngOnInit(): void {
  }

  getUser(): string {
    let user = String(localStorage.getItem('user'));
    return user;
  }

  logout() {
    this.authService.logout();
  }

}
