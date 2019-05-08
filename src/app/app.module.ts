import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClockComponent } from './clock/clock.component';
import { TaskviewComponent } from './taskview/taskview.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { ProjectViewComponent } from './project-view/project-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './register/register.component';
import { TasksPopoverComponent } from './tasks-popover/tasks-popover.component';
import { TasksServiceService } from './services/tasks-service.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';


@NgModule({
   declarations: [
      AppComponent,
      ClockComponent,
      TaskviewComponent,
      ProjectListComponent,
      TasksListComponent,
      ProjectViewComponent,
      RegisterComponent,
      TasksPopoverComponent
   ],
   entryComponents: [],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
   ],
   providers: [
      AuthenticationService,
      TasksServiceService,
      StatusBar,
      SplashScreen,
      Keyboard
      //provide
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
