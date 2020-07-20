import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { HeaderComponent } from './common/header/header.component';
import { HomepageComponent } from './user/homepage/homepage.component';
import { AlltasksComponent } from './user/alltasks/alltasks.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { PendingtaskComponent } from './user/pendingtask/pendingtask.component';
import { CompletedtaskComponent } from './user/completedtask/completedtask.component';
import { TaskdetailComponent } from './user/taskdetail/taskdetail.component';
import { ProfileComponent } from './common/profile/profile.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAlltasksComponent } from './admin/admin-alltasks/admin-alltasks.component';
import { AdminPendingtaskComponent } from './admin/admin-pendingtask/admin-pendingtask.component';
import { AdminCompletedtaskComponent } from './admin/admin-completedtask/admin-completedtask.component';
import { EmployeeprofileComponent } from './admin/employeeprofile/employeeprofile.component';
import { CreatetaskComponent } from './admin/createtask/createtask.component';
import { AdminTaskdetailComponent } from './admin/admin-taskdetail/admin-taskdetail.component';
import { ForgetpasswordComponent } from './account/forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    HomepageComponent,
    AlltasksComponent,
    DashboardComponent,
    PendingtaskComponent,
    CompletedtaskComponent,
    TaskdetailComponent,
    ProfileComponent,
    ChangepasswordComponent,
    ContactusComponent,
    AdminHomepageComponent,
    AdminDashboardComponent,
    AdminAlltasksComponent,
    AdminPendingtaskComponent,
    AdminCompletedtaskComponent,
    EmployeeprofileComponent,
    CreatetaskComponent,
    AdminTaskdetailComponent,
    ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
