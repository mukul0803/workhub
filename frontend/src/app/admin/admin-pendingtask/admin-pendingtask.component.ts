import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pendingtask',
  templateUrl: './admin-pendingtask.component.html',
  styleUrls: ['./admin-pendingtask.component.css']
})
export class AdminPendingtaskComponent implements OnInit {
  pendingTasks: any;
  allTasks: any;
  taskId: any;


  constructor(private task: TaskService, private router: Router) { }

  ngOnInit() {
    this.task.getpendingtask().subscribe(
      data => {
        this.pendingTasks = data;
        console.log(this.pendingTasks);
      },
      err => {
        console.log(err);
      }
    )

  }

  gettaskid(task) {
    console.log(task);
    this.taskId = task;
    this.router.navigateByUrl("/admin/taskdetail/" + this.taskId)
  }

}
