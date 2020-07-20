import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-admin-taskdetail',
  templateUrl: './admin-taskdetail.component.html',
  styleUrls: ['./admin-taskdetail.component.css']
})
export class AdminTaskdetailComponent implements OnInit {

  taskid: any;
  taskData: any;
  adminTaskDetail: FormGroup;
  chat: FormGroup;
  chatDetail: Object;

  userFullname;

  constructor(private activatedRouter: ActivatedRoute, private taskservice: TaskService, private auth: AuthenticationService) { }

  ngOnInit() {

    console.log(this.activatedRouter.snapshot.params);
    this.taskid = this.activatedRouter.snapshot.params;

    this.userFullname = this.auth.getUserDetails().name;
    console.log(this.userFullname);


    this.taskservice.gettaskdetails(this.taskid.id).subscribe(
      data => {
        console.log(data);
        this.taskData = data;
      },
      err => {
        console.log(err);
      }
    );

    this.taskservice.getChat(this.taskid.id).subscribe(
      data => {
        this.chatDetail = data;
        console.log(this.chatDetail);
      },
      err => {
        console.log(err);
      }
    );


    this.adminTaskDetail = new FormGroup({

      deadline: new FormControl(""),
      status: new FormControl(""),
      detail: new FormControl("")

    });

    this.chat = new FormGroup({

      comment: new FormControl("", [
        Validators.required,
      ]),

    });

  }



  editTask() {

    document.getElementById('showBtn').style.display = "block";
    document.getElementById('showCancel').style.display = "block";
    document.getElementById('showEditTask').style.display = "none";
    document.getElementById('inputDetails').style.display = "block";
    document.getElementById('taskdDetailShow').style.display = "none";
    document.getElementById('hideDeadline').style.display = "block";
    document.getElementById('hideStatus').style.display = "block";

    this.adminTaskDetail.setValue({
      deadline: this.taskData.deadline,
      status: this.taskData.status,
      detail: this.taskData.taskDetail
    });

  }

  cancelTask() {
    document.getElementById('showBtn').style.display = "none";
    document.getElementById('showCancel').style.display = "none";
    document.getElementById('showEditTask').style.display = "block";
    document.getElementById('inputDetails').style.display = "none";
    document.getElementById('taskdDetailShow').style.display = "block";
    document.getElementById('hideDeadline').style.display = "none";
    document.getElementById('hideStatus').style.display = "none";

  }

  updateTask() {


    if (this.adminTaskDetail.invalid) {
      console.log("Error by task Detail Form");
    }
    else {
      console.log(this.adminTaskDetail.value.status);

      this.taskservice.adminTaskUpdate(this.taskid.id, this.adminTaskDetail.value).subscribe(
        data => {
          console.log(data);
          document.getElementById('showBtn').style.display = "none";
          document.getElementById('showCancel').style.display = "none";
          document.getElementById('showEditTask').style.display = "block";
          document.getElementById('inputDetails').style.display = "none";
          document.getElementById('taskdDetailShow').style.display = "block";
          document.getElementById('hideDeadline').style.display = "none";
          document.getElementById('hideStatus').style.display = "none";
          location.reload()
        },
        err => {
          console.log(err);
        }
      );

    }


  }

  updateChat() {

    console.log(this.chat.value);

    if (this.chat.invalid) {
      alert("Box is Empty");
    }
    else {
      this.taskservice.UpdateChat(this.taskid.id, this.userFullname, this.chat.value).subscribe(
        data => {
          this.ngOnInit()
          // window.location.reload()
        },
        err => {
          console.log(err);
        }
      )
    }



  }

}
