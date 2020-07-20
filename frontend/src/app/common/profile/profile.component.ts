import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  details;

  public profileDetails: FormGroup;


  constructor(private userservice: UserService, private auth: AuthenticationService) { }

  ngOnInit() {

    this.username = this.auth.getUserDetails().username;

    this.userservice.getloginUser(this.username).subscribe(
      data => {
        this.details = data;
        console.log(this.details.fullname);
      },
      err => {
        console.log(err);
      }
    );

    this.profileDetails = new FormGroup({
      fullname: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern("[A-Z a-z]+")
      ])
    });




  }

  // editProfile: boolean = true;

  editUserProfile() {
    // this.editProfile = false;
    document.getElementById('showBtn').style.display = "block";
    document.getElementById('showInput1').style.display = "block";
    document.getElementById('showInput2').style.display = "block";
    document.getElementById('showInput3').style.display = "block";
    document.getElementById('showCancel').style.display = "block";
    document.getElementById('showEditProfile').style.display = "none";

    this.profileDetails.setValue({
      fullname: this.details.fullname,
    });


  }

  cancelEditProfile() {
    // this.editProfile = true;
    document.getElementById('showBtn').style.display = "none";
    document.getElementById('showInput1').style.display = "none";
    document.getElementById('showInput2').style.display = "none";
    document.getElementById('showInput3').style.display = "none";
    document.getElementById('showCancel').style.display = "none";
    document.getElementById('showEditProfile').style.display = "block";

  }

  updateProfile() {

    if (this.profileDetails.invalid) {
      alert("Please Fill All The Details Correctly.")
    }
    else {

      console.log(this.profileDetails.value);

      this.userservice.getuserdetails(this.username, this.profileDetails.value).subscribe(
        () => {
          alert("User Details Updated Sucessfully.");
          location.reload();
        },
        err => {
          console.log(err);
        }
      )

      document.getElementById('showBtn').style.display = "none";
      document.getElementById('showInput1').style.display = "none";
      document.getElementById('showInput2').style.display = "none";
      document.getElementById('showInput3').style.display = "none";
      document.getElementById('showCancel').style.display = "none";
      document.getElementById('showEditProfile').style.display = "block";

    }

  }


}
