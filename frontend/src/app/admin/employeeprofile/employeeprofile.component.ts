import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {

  employeesDetails: any;

  constructor(private userservice: UserService) { }

  ngOnInit() {

    this.userservice.getallusersdetails().subscribe(
      data => {
        this.employeesDetails = data;
        console.log(this.employeesDetails);
      },
      err => {
        console.log(err);
      }
    )

  }

}
