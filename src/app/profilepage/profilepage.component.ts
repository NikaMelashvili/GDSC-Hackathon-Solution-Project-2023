import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    // No need to initialize the form here anymore
  }

  onSubmit(action : any) {
    // Handle form submission logic here
    if (this.postForm.valid) {
      const formData = this.postForm.value;
      console.log('Form Data:', formData);

      // Reset the form after submission
      this.postForm.reset();
    } else {
      // Mark the form as touched to display validation errors
      this.markFormGroupTouched(this.postForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}