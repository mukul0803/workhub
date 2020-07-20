import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-alltasks',
  templateUrl: './admin-alltasks.component.html',
  styleUrls: ['./admin-alltasks.component.css']
})
export class AdminAlltasksComponent implements OnInit {

  allTasks: any;
  taskId: any;

  constructor(private task: TaskService, private router: Router) { }

  ngOnInit() {

    this.task.gettask().subscribe(
      data => {
        this.allTasks = data;
        console.log(this.allTasks);
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
