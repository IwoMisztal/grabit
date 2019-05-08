import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClockComponent } from './clock/clock.component';
import { TaskviewComponent } from './taskview/taskview.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { TasksPopoverComponent } from './tasks-popover/tasks-popover.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // },
  {
    path: 'task-view/:id',
    component: TaskviewComponent
  },
  {
    path: 'project-list',
    component: ProjectListComponent
  },
  {
    path: '',
    // loadChildren: './login/login.module#LoginPageModule'
    component: ProjectListComponent

  },
  {
    path: 'project-view/:id',
    component: ProjectViewComponent,
  },
  {
    path: 'tasks-popover/:id',
    component: TasksPopoverComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
