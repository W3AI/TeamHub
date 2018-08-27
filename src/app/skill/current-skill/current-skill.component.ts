import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { StopSkillComponent } from './stop-skill.component';
import { SkillService } from '../skill.service';
import * as fromSkill from '../skill.reducer';

@Component({
  selector: 'app-current-skill',
  templateUrl: './current-skill.component.html',
  styleUrls: ['./current-skill.component.css']
})
export class CurrentSkillComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog, 
    private skillService: SkillService, 
    private store: Store<fromSkill.State>
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    // step is the duration of an unit of work 
    // - the 1 to increase the progress up to 100%
    this.store.select(fromSkill.getActiveSkill).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.skillService.completeActivity();
          clearInterval(this.timer);
        }
      }, step);  
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopSkillComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO - include this in a PSkill Log
      if (result) {
        this.skillService.cancelActivity(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
 