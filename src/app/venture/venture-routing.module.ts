import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentureComponent } from './venture.component';

const routes: Routes = [
    { path: '', component: VentureComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VentureRoutingModule {}
