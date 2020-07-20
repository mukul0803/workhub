import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  taskid: any;
  taskData: any;

  taskDetailForm: FormGroup;
  chat: FormGroup;
  userFullname;
  chatDetail: Object;


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
    )

    this.taskDetailForm = new FormGroup({
      status: new FormControl('')
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
    document.getElementById('statusOption').style.display = "inline";

    this.taskDetailForm.setValue({
      status: this.taskData.status
    });

  }

  cancelTask() {
    document.getElementById('showBtn').style.display = "none";
    document.getElementById('showCancel').style.display = "none";
    document.getElementById('showEditTask').style.display = "block";
    document.getElementById('statusOption').style.display = "none";
  }

  updatestatus() {

    if (this.taskDetailForm.invalid) {
      console.log("Error by task Detail Form");
    }
    else {
      console.log(this.taskDetailForm.value.status);

      this.taskservice.userTaskUpdate(this.taskid.id, this.taskDetailForm.value).subscribe(
        data => {
          console.log(data);
          document.getElementById('showBtn').style.display = "none";
          document.getElementById('showCancel').style.display = "none";
          document.getElementById('showEditTask').style.display = "block";
          document.getElementById('statusOption').style.display = "none";
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

        },
        err => {
          console.log(err);
        }
      )
    }
  }



}
