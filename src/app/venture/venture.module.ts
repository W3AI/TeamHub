import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { VentureComponent } from './venture.component';
import { CurrentVentureComponent } from './current-venture/current-venture.component';
import { AddVentureComponent } from './add-venture/add-venture.component';
import { NewVentureComponent } from './new-venture/new-venture.component';
import { PastVentureComponent } from './past-venture/past-venture.component';
import { StopVentureComponent } from './current-venture/stop-venture.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { VentureRoutingModule } from './venture-routing.module';
import { ventureReducer } from './venture.reducer';

@NgModule({
    declarations: [
        VentureComponent,
        CurrentVentureComponent,
        AddVentureComponent,
        NewVentureComponent, 
        PastVentureComponent,
        StopVentureComponent
    ],
    imports: [
        SharedModule,
        VentureRoutingModule,
        StoreModule.forFeature('venture', ventureReducer)
    ],
    entryComponents: [StopVentureComponent]
})
export class VentureModule {}
