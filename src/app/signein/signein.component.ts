import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signein',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signein.component.html',
  styleUrl: './signein.component.css'
})
export class SigneinComponent {
  isRegistrationForm: boolean = true;
  registrationForm: any = {};
  loginForm: any = {};
  // username: string = '';
  // firstName: string = '';
  // lastName: string = '';
  // email: string = '';
  // password: string = '';

  toggleForm() {
    this.isRegistrationForm = !this.isRegistrationForm;
  }

  onSubmit(action: string) {
    if (action === 'register') {
      const formData = JSON.stringify({...this.registrationForm,
        firstname: this.registrationForm.firstName,
        lastname: this.registrationForm.lastName
      })
      // Implement registration logic here
      // alert('Registration form submitted');
      fetch("http://localhost:8080/auth/register",{
        method: 'post',
        headers: {
          "Content-Type": 'application/json'
        },
        body: formData
      }).then(res => res.json()).then(data => {
        console.log(data.message)
        alert(data.message)
      })
    } else if (action === 'login') {
      console.log(this.loginForm)
      const formData = JSON.stringify(this.loginForm)
      // Implement registration logic here
      // alert('Registration form submitted');
      try {
        fetch("http://localhost:8080/auth/login",{
          method: 'post',
          headers: {
            "Content-Type": 'application/json'
          },
          body: formData
        }).then(res => res.json()).then(data => {
          console.log("user logined with username: " + data.username)
          alert("user logined with username: " + data.username)
        })
      } catch(error) {
        console.log(error)
      }
    }
  }
}