import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProjectComponent } from './project/project.component';
import { SkillComponent } from './skill/skill.component';
import { VentureComponent } from './venture/venture.component';
import { CurrentProjectComponent } from './project/current-project/current-project.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { PastProjectComponent } from './project/past-project/past-project.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentSkillComponent } from './skill/current-skill/current-skill.component';
import { NewSkillComponent } from './skill/new-skill/new-skill.component';
import { PastSkillComponent } from './skill/past-skill/past-skill.component';
import { PastVentureComponent } from './venture/past-venture/past-venture.component';
import { NewVentureComponent } from './venture/new-venture/new-venture.component';
import { CurrentVentureComponent } from './venture/current-venture/current-venture.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopProjectComponent } from './project/current-project/stop-project.component';
import { AuthService } from './auth/auth.service';
import { ProjectService } from './project/project.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProjectComponent,
    SkillComponent,
    VentureComponent,
    CurrentProjectComponent,
    NewProjectComponent,
    PastProjectComponent,
    WelcomeComponent,
    CurrentSkillComponent,
    NewSkillComponent,
    PastSkillComponent,
    PastVentureComponent,
    NewVentureComponent,
    CurrentVentureComponent,
    HeaderComponent,
    SidenavListComponent,
    StopProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, ProjectService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopProjectComponent]
})
export class AppModule { }
