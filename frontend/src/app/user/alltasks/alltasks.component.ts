import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.css']
})
export class AlltasksComponent implements OnInit {

  taskId;
  details;
  username;

  constructor(private auth: AuthenticationService, private taskservice: TaskService, private router: Router
  ) { }

  ngOnInit() {
    this.username = this.auth.getUserDetails().username;
    console.log(this.username);

    this.taskservice.getusertask(this.username).subscribe(
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
