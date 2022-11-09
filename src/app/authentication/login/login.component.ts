import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,) {}
  form!: FormGroup;

  err: boolean = false;
  @Input()
  errores: string[] = [];
  @Input()
  accion!: string;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    });
  }

  onSubmit(data: any){

    if(this.authService.login(data))
    {
      this.err = false;
      this.router.navigate(['/users']);
    }
    else {
      this.err = true;      
    }
  }
}
