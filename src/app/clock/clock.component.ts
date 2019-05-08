import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Storage } from '@ionic/storage';
import { Project } from '../models/project';
import { Task } from '../models/task';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  @Output() incrementIteration = new EventEmitter<boolean>();
  @Output() timeRunningEmmiter = new EventEmitter<boolean>();

  public timeLeft: number;
  private workTime: number = 5;
  private breakTime: number = 3;
  private interval: number;
  public timeRunning: boolean = false;
  public isBreak: boolean = false;


  constructor() { 

  }

  ngOnInit() {
    this.timeLeft = this.workTime;
  }

  private setTime() {
    if (this.isBreak) {
      this.timeLeft = this.breakTime;
      this.startTimer();
    } else {
      this.timeLeft = this.workTime;
    }
  }

  public startTimer() {
      this.timeRunningEmmiter.emit(true);
      this.timeRunning = true;
      this.interval = window.setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeRunning = false;
          this.timerFinished();
        }
      }, 1000);
  }

  public pauseTimer() {
    this.timeRunningEmmiter.emit(false);
    this.timeRunning = false;
    clearInterval(this.interval);
  }

  private timerFinished() {
    this.timeRunningEmmiter.emit(false);
    clearInterval(this.interval);
    if (this.isBreak) {
      this.isBreak = false;
    } else {
      this.onIncrementIteration();
      this.isBreak = true;
    }
    this.setTime();
  }

  public timeToReadable(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return ((minutes > 10) ? minutes : '0' + minutes) + ":" + ((seconds > 10) ? seconds.toString() : '0' + seconds);  
  }

  private onIncrementIteration() {
    this.incrementIteration.emit(true);
  }

  private resetTimer() {
    this.timeRunningEmmiter.emit(false);
    clearInterval(this.interval);
    this.isBreak = false;
    this.timeRunning = false;
    this.timeLeft = this.workTime;
    return true;
  }

}
