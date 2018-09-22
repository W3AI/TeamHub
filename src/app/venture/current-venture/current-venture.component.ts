import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { StopVentureComponent } from './stop-venture.component';
import { VentureService } from '../venture.service';
import * as fromVenture from '../venture.reducer';
import { Adventure } from '../../logic/Adventure';
import { Update } from '../../logic/update.model';
import { LoggerService } from '../../logic/logger.service';

@Component({
  selector: 'app-current-venture',
  templateUrl: './current-venture.component.html',
  styleUrls: ['./current-venture.component.css']
})
export class CurrentVentureComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'name', 'message', 'state'];
  public dataUpdates = new MatTableDataSource<Update>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog, 
    private ventureService: VentureService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
    
    this.dataUpdates.data = this.ventureService.getUpdates({
      id: 0,
      name: '3Jars',
      message: 'from ngOnInit',
      state: 'launched'
    });
  }

  startOrResumeTimer() {
    // step is the duration of an unit of work 
    // - the 1 to increase the progress up to 100%
    this.store.select(fromVenture.getActiveVenture).pipe(take(1)).subscribe(ex => {
      
      // Start new Adventure / Constructor
      const adventure = new Adventure(
        this.ventureService, 
        ex.name,
        ex.duration,
        ex.cost,
        ex.startScript,
        ex.checkScript,
        ex.inputScript,
        ex.changeScript,
        ex.outputScript
      );

      this.ventureService.getUpdates({
        id: 1,
        name: '3Jars',
        message: 'from startOrResumeTimer',
        state: 'constructed'
      }); 

      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.ventureService.completeControl();
          clearInterval(this.timer);
        }
      }, step);  
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopVentureComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO - include this in a Venture Log
      if (result) {
        this.ventureService.cancelControl(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  ngAfterViewInit() {
    this.dataUpdates.sort = this.sort;
    this.dataUpdates.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataUpdates.filter = filterValue.trim().toLowerCase();
  }
}
 