import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    })
  }

  login() {
    if (this.loginForm.invalid) {
      // console.log(this.register.errors);
      alert("Please Fill All the Details Correctly.");
    } else {
      console.log(this.loginForm.value);

      this.auth.login(this.loginForm.value).subscribe(
        (userlogin: any) => {



          console.log(userlogin);

          if (userlogin.Message == "Password is Incorrect" || userlogin.Message == "Invalid Username" || userlogin.Message == "Email is not registered") {
            alert(userlogin.Message);
          }
          else {
            if (this.auth.getUserDetails().isAdmin === true) {
              this.router.navigateByUrl('/admin');
            }
            else {
              this.router.navigateByUrl('/user');
            }
          }

        },
        err => {
          console.log(err);
        }
      )

    }
  }

}
