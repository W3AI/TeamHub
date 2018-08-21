import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  // TODO - Ongoing should be a list of projects not just one
  ongoingProject = false;
  taskSubscription: Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.taskSubscription = this.projectService.taskChanged.subscribe(
      task => {
        if (task) {
          this.ongoingProject = true;
        } else {
          this.ongoingProject = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
