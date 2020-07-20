import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

//Component Paths
//Logins
import { LoginComponent } from './account/login/login.component';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgetpasswordComponent } from './account/forgetpassword/forgetpassword.component';

//Users
import { HomepageComponent } from './user/homepage/homepage.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AlltasksComponent } from './user/alltasks/alltasks.component';
import { PendingtaskComponent } from './user/pendingtask/pendingtask.component';
import { CompletedtaskComponent } from './user/completedtask/completedtask.component';
import { TaskdetailComponent } from './user/taskdetail/taskdetail.component';
import { ProfileComponent } from './common/profile/profile.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';
import { ContactusComponent } from './common/contactus/contactus.component';

//Admin
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAlltasksComponent } from './admin/admin-alltasks/admin-alltasks.component';
import { AdminPendingtaskComponent } from "./admin/admin-pendingtask/admin-pendingtask.component";
import { AdminCompletedtaskComponent } from "./admin/admin-completedtask/admin-completedtask.component";
import { EmployeeprofileComponent } from './admin/employeeprofile/employeeprofile.component';
import { CreatetaskComponent } from './admin/createtask/createtask.component';
import { AdminTaskdetailComponent } from './admin/admin-taskdetail/admin-taskdetail.component';


const routes: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  {
    path: "", component: LoginComponent, children: [
      { path: "signin", component: SigninComponent },
      { path: "signup", component: SignupComponent },
      { path: "forgetpassword", component: ForgetpasswordComponent }
    ]
  },
  {
    path: "user", component: HomepageComponent, canActivate: [AuthGuardService], children: [
      // { path: "", component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: "", component: AlltasksComponent },
      { path: "pendingtasks", component: PendingtaskComponent },
      { path: "completedtasks", component: CompletedtaskComponent },
      { path: "taskdetail/:id", component: TaskdetailComponent },
      { path: "profile", component: ProfileComponent },
      { path: "changepassword", component: ChangepasswordComponent },
      { path: "contactus", component: ContactusComponent }
    ]
  },
  {
    path: "admin", component: AdminHomepageComponent, children: [
      // { path: "", component: AdminDashboardComponent },
      { path: "", component: AdminAlltasksComponent },
      { path: "pendingtasks", component: AdminPendingtaskComponent },
      { path: "completedtasks", component: AdminCompletedtaskComponent },
      { path: "profile", component: ProfileComponent },
      { path: "changepassword", component: ChangepasswordComponent },
      { path: "contactus", component: ContactusComponent },
      { path: "employeeprofile", component: EmployeeprofileComponent },
      { path: "createtask", component: CreatetaskComponent },
      { path: "taskdetail/:id", component: AdminTaskdetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
