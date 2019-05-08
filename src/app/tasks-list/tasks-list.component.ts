import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { Project } from '../models/project';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  @Input() projectId: string;

  tasksList: Task[] = [];

  constructor(private ionicStorage: Storage) { }

  ngOnInit() {
    this.generateTasksList();
  }

  private generateTasksList() {
    console.log(this.projectId);
    this.ionicStorage.get("Tasks")
      .then(q => this.tasksList.push(q.find(x => x.projectId == this.projectId)));
  }

}
