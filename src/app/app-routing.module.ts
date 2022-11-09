import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { UsersListComponent } from './users/users-list/users-list.component';

const routes: Routes = [
  {path: '',
              redirectTo: '/login',
              pathMatch: 'full'},
  {path: 'users', component: UsersListComponent},
  {path: 'login', component: LoginComponent},
    {
        path: '**',
        redirectTo: '404'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
