import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tasks-popover',
  templateUrl: './tasks-popover.component.html',
  styleUrls: ['./tasks-popover.component.css']
})
export class TasksPopoverComponent implements OnInit {

  undoneTasksList: Task[];
  projectId: string;
  newTaskTitle: string;
  projectTitle: string;

  constructor(private route: ActivatedRoute, private ionicStorage: Storage,
    public popoverCtrl: PopoverController) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.projectId = params['id'].toString();
      }
      this.refreshTaskList();
      this.ionicStorage.get('Projects').then(q => {
        this.projectTitle = q.find(e => e.id == this.projectId).title;
      });
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

  private refreshTaskList() {
    this.ionicStorage.get('Tasks')
      .then(q => {
        console.log(q);
        if (q != null) {
          this.undoneTasksList = q.filter(x => x.projectId === this.projectId && x.done === false);
          console.log(this.undoneTasksList);
      }
    });
  }
  
  public addTaskToProject() {
    const title = this.newTaskTitle;
    const newTask: Task = {
      id: uuid(),
      title: title,
      projectId: this.projectId,
      done: false,
      selected: false,
      finishedIterations: 0
    };
    let newTasksList = [];
    this.ionicStorage.get('Tasks')
      .then(q => {
          if (q != null) {
            newTasksList = q;
          }
        })
      .then(() => newTasksList.push(newTask))
      .then(() => this.ionicStorage.set('Tasks', newTasksList))
      .then(() => this.refreshTaskList());
    this.newTaskTitle = '';
  }

  public dismissPopover() {
    this.popoverCtrl.dismiss();
  }
}
