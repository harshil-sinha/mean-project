import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';

import {Router} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loading = false;
  error = '';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if(this.loginForm.invalid) return;

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next:(res: any) =>{
        this.authService.saveToken(
          res.token
        );

        this.router.navigate([
          '/dashboard',
        ]);

        this.loading = false;
      },

      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    })
  }
}
