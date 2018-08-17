import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopProjectComponent } from './stop-project.component';

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {

  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopProjectComponent);
  }
}
 