import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { AccountComponent } from './account.component';
import { CurrentAccountsComponent } from './current-accounts/current-accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { accountReducer } from './account.reducer';

@NgModule({
    declarations: [
        AccountComponent,
        CurrentAccountsComponent,
        AddAccountComponent,
        AllAccountsComponent
    ],
    imports: [
        SharedModule,
        AccountRoutingModule,
        StoreModule.forFeature('account', accountReducer)
    ],
    entryComponents: []
})
export class AccountModule {}
