import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { AccountComponent } from './account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { accountReducer } from './account.reducer';

@NgModule({
    declarations: [
        AccountComponent,
        AddAccountComponent,
    ],
    imports: [
        SharedModule,
        AccountRoutingModule,
        StoreModule.forFeature('account', accountReducer)
    ],
    entryComponents: []
})
export class AccountModule {}
