import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SkillComponent } from './skill/skill.component';
import { VentureComponent } from './venture/venture.component';
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
import { AuthService } from './auth/auth.service';
import { ProjectService } from './project/project.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@NgModule({
  declarations: [
    AppComponent,
    SkillComponent,
    VentureComponent,
    WelcomeComponent,
    CurrentSkillComponent,
    NewSkillComponent,
    PastSkillComponent,
    PastVentureComponent,
    NewVentureComponent,
    CurrentVentureComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    ProjectModule,
    AngularFirestoreModule,
    AuthModule
  ],
  providers: [AuthService, ProjectService, UIService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
