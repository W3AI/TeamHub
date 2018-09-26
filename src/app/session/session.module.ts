import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { SessionComponent } from './session.component';
import { CurrentSessionComponent } from './current-session/current-session.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { ListSessionComponent } from './list-session/list-session.component';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { SessionRoutingModule } from './session-routing.module';
import { sessionReducer } from './session.reducer';

@NgModule({
    declarations: [
        SessionComponent,
        CurrentSessionComponent,
        AddSessionComponent,
        ListSessionComponent,
        EditSessionComponent
    ],
    imports: [
        SharedModule,
        SessionRoutingModule,
        StoreModule.forFeature('session', sessionReducer)
    ],
    entryComponents: []
})
export class SessionModule {}
