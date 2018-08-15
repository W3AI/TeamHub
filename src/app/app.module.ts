import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    CurrentVentureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
