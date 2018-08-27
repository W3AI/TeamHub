import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

import { VentureComponent } from './venture/venture.component';

import { AuthGuard } from './auth/auth.guard';

// TODO - Move skill and venture routes same as project!
const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'project', loadChildren: './project/project.module#ProjectModule', canLoad: [AuthGuard] },
    { path: 'skill', loadChildren: './skill/skill.module#SkillModule', canLoad: [AuthGuard] },

    { path: 'venture', component: VentureComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}