import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProjectComponent } from './project.component';
import { CurrentProjectComponent } from './current-project/current-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { PastProjectComponent } from './past-project/past-project.component';
import { StopProjectComponent } from './current-project/stop-project.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
    declarations: [
        ProjectComponent,
        CurrentProjectComponent, 
        NewProjectComponent, 
        PastProjectComponent,
        StopProjectComponent
    ],
    imports: [
        SharedModule,
        ProjectRoutingModule
    ],
    entryComponents: [StopProjectComponent]
})
export class ProjectModule {}
