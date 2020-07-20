import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.register = new FormGroup({

      fullname: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern("[A-Z a-z]+")
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern("^[a-zA-Z][a-zA-Z0-9]+"),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern("[A-Za-z0-9 @._]+")
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern("[A-Za-z0-9 @._]+")
      ])

    });

  }

  createaccount() {

    if (this.register.invalid) {
      alert("Please Fill All The Details Correctly.")
    }
    else {
      console.log(this.register.value);

      this.auth.register(this.register.value).subscribe(
        () => {
          this.router.navigateByUrl("/signin");
          console.log("User Registered");
        },
        err => {
          console.log(err);
        }
      )

    }

  }

}
