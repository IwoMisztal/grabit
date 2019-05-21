import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Project } from '../models/project';
import { Storage } from '@ionic/storage';
import { Task } from '../models/task';
import { Subscription } from 'rxjs';
import { TasksServiceService } from '../services/tasks-service.service';
import { SyncService } from '../services/sync.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  insertId: string = '';
  newProjectTitle: string;
  projectsList: Project[] = [];
  tasksList: Task[] = [];
  message: string;
  editedProjectTitle: string;

  doRefreshTasksNumber: Subscription;

  constructor(private ionicStorage: Storage, private tasksService: TasksServiceService,
    private syncService: SyncService, private keyboard: Keyboard) {
    this.doRefreshTasksNumber = this.tasksService.refreshTasksNumber.subscribe(() => { 
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.ionicStorage.get('Tasks').then(q => this.tasksList = q).then(() => this.refreshProjectsList());
  }

  addProject() {
    if (this.keyboard.isVisible === true) {
      this.keyboard.hide();
    }
    let blockedAdding = false;
    const title = this.newProjectTitle;
    const newProject: Project = new Project(uuid(), title);
    let oldProjectsList = [];
    if (title != undefined) {
      this.ionicStorage.get('Projects').then(q => q != undefined && q.length ? oldProjectsList = q : oldProjectsList = [])
        .then( q => {
          if (q.filter(x => x.archived === false).find(x => x.title === newProject.title)) {
            this.showMessage('Name already exists');
            blockedAdding = true;
          }
        })
        .then(() => {
          if (!blockedAdding)
          {
            oldProjectsList.push(newProject);
          }
        })
        .then(() => this.ionicStorage.set('Projects', oldProjectsList))
        .then(() => this.refreshProjectsList());
      this.newProjectTitle = '';
    }
  }

  refreshProjectsList() {
    this.ionicStorage.get('Projects').then(q => this.projectsList = q);
  }

  onDeleteProject(id: string) {
    let newProjectsList = [];
    this.ionicStorage.get('Projects')
      .then(q => newProjectsList = q)
      .then(q => newProjectsList.find(x => x.id === id).archived = true)
      .then(q => this.ionicStorage.set('Projects', newProjectsList))
      .then(() => this.refreshProjectsList());
  }

  getNumberOfTasksAssignedToProject(projectId: string) {
    if (this.tasksList != null) {
      return this.tasksList.filter(x => x.projectId === projectId && x.done === false).length;
    } else {
      return 0;
    }
  }

  getActiveProjects() {
    return this.projectsList.filter(q => q.archived === false);
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  syncToDatabase() {
    this.syncService.syncToDatabase(this.projectsList);
  }

  startInsertMode(project: Project) {
    this.insertId = project.id;
    this.editedProjectTitle = project.title;
  }

  endInsertMode() {
    this.projectsList.find(q => q.id === this.insertId).title = this.editedProjectTitle;
    this.ionicStorage.set('Projects', this.projectsList);
    this.insertId = '';
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'Enter') {
      this.endInsertMode();
    }
  }
}
