import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopProjectComponent } from './stop-project.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {
  @Output() projectExit = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog private projectService: ProjectService) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    // step is the duration of an unit of work 
    // - the 1 to increase the progress up to 100%
    const step = this.projectService.getRunningTask().duration / 100 * 1000;

    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, step);

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
        this.projectExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
 