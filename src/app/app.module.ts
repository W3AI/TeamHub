import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AccountService } from './account/account.service';
import { AuthService } from './auth/auth.service';
import { ProjectService } from './project/project.service';
import { SkillService } from './skill/skill.service';
import { VentureService } from './venture/venture.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { reducers } from './app.reducer';
import { AddTaskComponent } from './project/add-task/add-task.component';
import { AddTestComponent } from './project/add-test/add-test.component';
import { AboutComponent } from './about/about.component';
import { MarketComponent } from './market/market.component';
import { FriendComponent } from './friend/friend.component';
import { AddFriendComponent } from './friend/add-friend/add-friend.component';
import { ListFriendComponent } from './friend/list-friend/list-friend.component';
import { BrowseFriendComponent } from './friend/browse-friend/browse-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    AddTaskComponent,
    AddTestComponent,
    AboutComponent,
    MarketComponent,
    FriendComponent,
    AddFriendComponent,
    ListFriendComponent,
    BrowseFriendComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, AccountService, ProjectService, SkillService, VentureService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
