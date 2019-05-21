import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Task } from '../models/task';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { TasksServiceService } from '../services/tasks-service.service';



@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  projectId: string;
  doneTasksList: Task[] = [];
  undoneTasksList: Task[] = [];
  newTaskTitle: string;
  projectTitle: string;

  constructor(private route: ActivatedRoute, private ionicStorage: Storage,
    private taskService: TasksServiceService, private router: Router) { 
      router.events.subscribe(() => this.refreshTaskList());
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.projectId = params['id'].toString();
      }
      this.ionicStorage.get('Projects').then(q => {
        this.projectTitle = q.find(e => e.id == this.projectId).title;
      }).then(() => this.refreshTaskList());
    });
  }

  public selectTask(taskId: string) {
    let newTasksList = [];
    this.ionicStorage.get('Tasks').then(q => {
      q.filter(e => e.projectId === this.projectId).forEach(e => {
        e.selected = false;
        if (e.id === taskId) {
          e.selected = true;
        }
      });
      newTasksList = q;
    })
    .then(() => this.ionicStorage.set('Tasks', newTasksList))
    .then(() => this.refreshTaskList());
  }

  public addTaskToProject() {
    this.taskService.addTaskToProject(this.newTaskTitle, this.projectId).then(() => this.refreshTaskList());
    this.newTaskTitle = '';
  }

  private refreshTaskList() {
    this.ionicStorage.get('Tasks')
      .then(q => {
        if (q != null && q !== undefined && q.length) {
          this.doneTasksList = q.filter(x => x.projectId === this.projectId && x.done === true);
          this.undoneTasksList = q.filter(x => x.projectId === this.projectId && x.done === false);
      }
    });
  }

  onDeleteTask(taskId: string) {
    let newTasksList: Task[];
    this.ionicStorage.get('Tasks')
    .then(q => {
      newTasksList = q;
      this.ionicStorage.set('Tasks', newTasksList.filter(x => x.id !== taskId)).then(() => this.refreshTaskList());
    });
  }

  public goToTask(taskId: string) {
    let newTasksList = [];
    this.ionicStorage.get('Tasks').then(q => {
      q.filter(e => e.projectId === this.projectId).forEach(e => {
        e.selected = false;
        if (e.id === taskId) {
          e.selected = true;
        }
      });
      newTasksList = q;
    })
    .then(() => this.ionicStorage.set('Tasks', newTasksList))
    .then(() => this.router.navigate(['/task-view', this.projectId]))
  }

}
