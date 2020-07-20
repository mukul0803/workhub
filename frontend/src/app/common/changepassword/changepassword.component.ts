import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  userEmail: any;
  changePassword: FormGroup;

  constructor(private userservice: UserService, private auth: AuthenticationService) { }

  ngOnInit() {

    this.userEmail = this.auth.getUserDetails().email;
    console.log(this.userEmail);

    this.changePassword = new FormGroup({

      currentPassword: new FormControl("", [
        Validators.required
      ]),
      newPassword: new FormControl("", [
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

  updatePassword() {

    if (this.changePassword.invalid) {
      alert("Please Fill All The Details Correctly.");
    }
    else {
      console.log(this.changePassword.value);

      this.userservice.changepassword(this.userEmail, this.changePassword.value).subscribe(
        data => {
          alert("Password Change Successfully");
          console.log(data);
        },
        err => {
          alert("Password not Changed.");
          console.log(err);
        }
      )

    }

  }

}
