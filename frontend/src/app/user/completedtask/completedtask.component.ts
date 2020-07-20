import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completedtask',
  templateUrl: './completedtask.component.html',
  styleUrls: ['./completedtask.component.css']
})
export class CompletedtaskComponent implements OnInit {

  taskId;
  details;
  username;

  constructor(private auth: AuthenticationService, private taskservice: TaskService, private router: Router
  ) { }

  ngOnInit() {
    this.username = this.auth.getUserDetails().username;
    console.log(this.username);

    this.taskservice.getusercompleted(this.username).subscribe(
      user => {
        this.details = user;
        console.log(this.details);
      },
      err => {
        console.error(err)
      }
    )
  }

  gettaskid(task) {
    console.log(task);
    this.taskId = task;
    this.router.navigateByUrl("/user/taskdetail/" + this.taskId)
  }

}
