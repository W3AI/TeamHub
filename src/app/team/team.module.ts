import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { TeamComponent } from './team.component';
import { InvitePlayerComponent } from './invite-player/invite-player.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { SelectPlayerComponent } from './select-player/select-player.component';
import { ListPlayerComponent } from './list-player/list-player.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TeamRoutingModule } from './team-routing.module';
import { teamReducer } from './team.reducer';

// import { StopSkillComponent } from './current-skill/stop-skill.component';
//        StopSkillComponent

@NgModule({
    declarations: [
        TeamComponent,
        InvitePlayerComponent,
        AddTeamComponent,
        ListTeamComponent,
        SelectPlayerComponent, 
        ListPlayerComponent
    ],
    imports: [
        SharedModule,
        TeamRoutingModule,
        StoreModule.forFeature('team', teamReducer)
    ],
    entryComponents: []   // it included StopSkillComponent
})
export class TeamModule {}
