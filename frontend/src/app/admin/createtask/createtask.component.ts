import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit {

  employeesDetails: any;
  task: FormGroup;

  constructor(private taskservice: TaskService, private userservice: UserService) { }

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

    this.task = new FormGroup({
      fullname: new FormControl("", [
        Validators.required
      ]),
      username: new FormControl("", [
        Validators.required
      ]),
      taskName: new FormControl("", [
        Validators.required
      ]),
      deadline: new FormControl("", [
        Validators.required
      ]),
      taskDetail: new FormControl("", [
        Validators.required
      ])
    });

  }

  createtask() {


    if (this.task.invalid) {
      alert("Please Fill All The Details Correctly.")
    }
    else {
      console.log(this.task.value);

      this.taskservice.createtask(this.task.value).subscribe(
        () => {
          alert("Task is Created");
        },
        err => {
          console.log(err);
        }
      )
    }

  }


  getUsername(username) {
    console.log(username);
  }

}
