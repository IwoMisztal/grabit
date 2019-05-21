import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { Storage } from '@ionic/storage';
import { PopoverController, ToastController } from '@ionic/angular';
import { TasksPopoverComponent } from '../tasks-popover/tasks-popover.component';


@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  public currentProject: Project;
  public projectId: string;
  public activeTask: Task;
  public isTimeRunning: boolean;

  constructor(private route: ActivatedRoute, private storage: Storage,
    public popoverController: PopoverController, public toastController: ToastController,
    private router: Router) { 
  }

  setCurrentProject() {
    this.storage.get('Projects').then(q => this.currentProject = q.find(x => x.id === this.projectId));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'].toString();
      this.refreshActiveTask();
      this.setCurrentProject();
    });
  }

  async pickTask() {
    const popover = await this.popoverController.create({
      component: TasksPopoverComponent,
      componentProps: {projectId: this.projectId},
      cssClass: 'popover-full-width'
    });
    popover.present();
    popover.onDidDismiss().then(() =>{
    this.refreshActiveTask();
    })
  }

  refreshActiveTask() {
    this.storage.get('Tasks').then(q => {
      this.activeTask = q.find(e => e.projectId === this.projectId && e.selected === true);
      console.log(this.activeTask);
    });
  }

  doneTask(taskId: string) {
    let newTasksList: Task[];
    this.storage.get('Tasks').then(q => {
      newTasksList = q;
      newTasksList.find(e => e.projectId === this.projectId && e.selected == true).done = true;
      this.storage.set('Tasks', newTasksList).then(() => {
        this.refreshActiveTask();
      }).then(() => this.router.navigate(['/project-view', this.projectId]));
      this.presentToast('Task marked as done');
    })
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  } 

  onIncrementIteration() {
    if (this.activeTask) {
      let newTasksList: Task[];
      this.storage.get('Tasks').then(q => {
        newTasksList = q;
        newTasksList.find(e => e.id === this.activeTask.id).finishedIterations++;
        this.storage.set('Tasks', newTasksList).then(() => {
          this.refreshActiveTask();
        });
      });
    }
  }

  onIsTimeRunning(isTimeRunning: boolean) {
    this.isTimeRunning = isTimeRunning;
  }
}