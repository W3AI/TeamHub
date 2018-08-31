import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { ProjectComponent } from './project.component';
import { CurrentProjectComponent } from './current-project/current-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { PastProjectComponent } from './past-project/past-project.component';
import { StopProjectComponent } from './current-project/stop-project.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { projectReducer } from './project.reducer';

@NgModule({
    declarations: [
        ProjectComponent,
        CurrentProjectComponent,
        AddProjectComponent,
        NewProjectComponent, 
        PastProjectComponent,
        StopProjectComponent
    ],
    imports: [
        SharedModule,
        ProjectRoutingModule,
        StoreModule.forFeature('project', projectReducer)
    ],
    entryComponents: [StopProjectComponent]
})
export class ProjectModule {}
