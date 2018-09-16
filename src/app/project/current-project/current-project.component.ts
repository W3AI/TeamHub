import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { StopProjectComponent } from './stop-project.component';
import { ProjectService } from '../project.service';
import * as fromProject from '../project.reducer';

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog, 
    private projectService: ProjectService, 
    private store: Store<fromProject.State>
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    // step is the duration of an unit of work 
    // - the 1 to increase the progress up to 100%
    this.store.select(fromProject.getActiveProject).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.projectService.completeTask();
          clearInterval(this.timer);
        }
      }, step);  
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopProjectComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO - include this in a Project Log
      if (result) {
        this.projectService.cancelTask(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
 