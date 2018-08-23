import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProjectService } from './project.service';
import * as fromProject from './project.reducer';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // TODO - Ongoing should be a list of projects not just one
  ongoingProject$: Observable<boolean>;

  constructor(private projectService: ProjectService, private store: Store<fromProject.State>) { }

  ngOnInit() {
    this.ongoingProject$ = this.store.select(fromProject.getIsProject)
  }
}
