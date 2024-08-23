import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  user: any;
  isEditing = false;
  editForm!: FormGroup;
  newProfileImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required],
      age: [this.user.age, [Validators.required, Validators.min(18)]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onEdit(): void {
    this.isEditing = true;
  }

  closeEdit(): void {
    this.isEditing = false;
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newProfileImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveEdit(): void {
    if (this.editForm.valid) {
      this.user.name = this.editForm.value.name;
      this.user.age = this.editForm.value.age;
      this.user.email = this.editForm.value.email;

      // If a new image has been uploaded, update the profile image
      if (this.newProfileImage) {
        this.user.profileImage = this.newProfileImage;
      }

      // Save the updated user details to local storage
      localStorage.setItem('user', JSON.stringify(this.user));

      this.isEditing = false;
    }
  }

  onDelete(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/registration']);
  }
}