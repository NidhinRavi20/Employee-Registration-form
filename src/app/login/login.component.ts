import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email === this.loginForm.value.email && user.password === this.loginForm.value.password) {
      this.router.navigate(['/employee-list']);
    } else {
      alert('Invalid email or password');
    }
  }
}