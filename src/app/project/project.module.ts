import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProjectComponent } from './project.component';
import { CurrentProjectComponent } from './current-project/current-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { PastProjectComponent } from './past-project/past-project.component';
import { StopProjectComponent } from './current-project/stop-project.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
    declarations: [
        ProjectComponent,
        CurrentProjectComponent, 
        NewProjectComponent, 
        PastProjectComponent,
        StopProjectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AuthModule
    ],
    entryComponents: [StopProjectComponent]
})
export class ProjectModule {}