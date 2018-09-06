import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProjectService } from '../project.service';
import { Plan } from '../plan.model';
import { UIService } from '../../shared/ui.service';
import * as fromProject from '../project.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - Refactoring under Project ~? Plan n Task

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  plans$: Observable<Plan[]>;
  // isLoading$: Observable<boolean>;

  constructor(
    private projectService: ProjectService, 
    private uiService:  UIService, 
    private store: Store<fromProject.State>
  ) {}

  ngOnInit() {
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.plans$ = this.store.select(fromProject.getAvailablePlans);
    // this.fetchPlans();   
  }

  onAddProject(form: NgForm) {
    this.projectService.addProject( form.value );
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

}
