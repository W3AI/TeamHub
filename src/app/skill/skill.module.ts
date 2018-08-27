import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { SkillComponent } from './skill.component';
import { CurrentSkillComponent } from './current-skill/current-skill.component';
import { NewSkillComponent } from './new-skill/new-skill.component';
import { PastSkillComponent } from './past-skill/past-skill.component';
import { StopSkillComponent } from './current-skill/stop-skill.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { SkillRoutingModule } from './skill-routing.module';
import { skillReducer } from './skill.reducer';

@NgModule({
    declarations: [
        SkillComponent,
        CurrentSkillComponent, 
        NewSkillComponent, 
        PastSkillComponent,
        StopSkillComponent
    ],
    imports: [
        SharedModule,
        SkillRoutingModule,
        StoreModule.forFeature('skill', skillReducer)
    ],
    entryComponents: [StopSkillComponent]
})
export class SkillModule {}
