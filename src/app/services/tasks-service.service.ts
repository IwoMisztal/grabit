import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Storage } from '@ionic/storage';
import { Task } from '../models/task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

public refreshTasksNumber = new Subject<any>();

constructor(private ionicStorage: Storage) { }

public addTaskToProject(taskTitle, projectId) {
  if (taskTitle != "") {
  const newTask: Task = {
    id: uuid(),
    title: taskTitle,
    projectId: projectId,
    done: false,
    selected: false,
    finishedIterations: 0
  };
  let newTasksList = [];
  return this.ionicStorage.get('Tasks')
    .then(q => {
        if (q != null) {
          newTasksList = q;
        }
      })
    .then(() => newTasksList.push(newTask))
    .then(() => this.ionicStorage.set('Tasks', newTasksList)).then(() => this.refreshTasksNumber.next(true));
}
}

}
