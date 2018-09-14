import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendComponent } from './friend.component';

const routes: Routes = [
    { path: '', component: FriendComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FriendRoutingModule {}