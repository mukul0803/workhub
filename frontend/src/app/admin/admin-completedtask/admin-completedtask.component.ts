import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-completedtask',
  templateUrl: './admin-completedtask.component.html',
  styleUrls: ['./admin-completedtask.component.css']
})
export class AdminCompletedtaskComponent implements OnInit {

  allTasks: any;
  taskId: any;
  completedTasks: any;

  constructor(private task: TaskService, private router: Router) { }

  ngOnInit() {

    this.task.getcompletedtask().subscribe(
      data => {
        this.completedTasks = data;
        console.log(this.completedTasks);
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
