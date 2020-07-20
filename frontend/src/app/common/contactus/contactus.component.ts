import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactDetails: FormGroup

  constructor(private userservice: UserService) { }

  ngOnInit() {

    this.contactDetails = new FormGroup({

      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern("[A-Z a-z]+")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,}$")
      ]),
      subject: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      message: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),

    });

  }

  contactus() {

    if (this.contactDetails.invalid) {
      alert("Please Fill All The Details Correctly.")
    }
    else {
      console.log(this.contactDetails.value);

      this.userservice.contactus(this.contactDetails.value).subscribe(
        data => {
          alert("Message Send Sucessfully.");
        },
        err => {
          console.log(err);
          alert("Message Not Send");
        }
      )

    }

  }

}
