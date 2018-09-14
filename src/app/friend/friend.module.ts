import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { FriendComponent } from './friend.component';
import { CurrentFriendComponent } from './current-friend/current-friend.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { ListFriendComponent } from './list-friend/list-friend.component';
import { EditFriendComponent } from './edit-friend/edit-friend.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FriendRoutingModule } from './friend-routing.module';
import { friendReducer } from './friend.reducer';

@NgModule({
    declarations: [
        FriendComponent,
        CurrentFriendComponent,
        AddFriendComponent,
        ListFriendComponent,
        EditFriendComponent
    ],
    imports: [
        SharedModule,
        FriendRoutingModule,
        StoreModule.forFeature('friend', friendReducer)
    ],
    entryComponents: []
})
export class FriendModule {}
