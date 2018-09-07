import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Investment } from '../investment.model';
import { VentureService } from '../venture.service';
import * as fromVenture from '../venture.reducer';

@Component({
  selector: 'app-list-venture',
  templateUrl: './list-venture.component.html',
  styleUrls: ['./list-venture.component.css']
})
export class ListVentureComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'tags', 'description', 'url'];
  dataSource = new MatTableDataSource<Investment>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ventureService: VentureService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.store.select(fromVenture.getAvailableInvestments).subscribe(
      (investments: Investment[]) => {
        this.dataSource.data = investments;
      }
    );
    this.ventureService.fetchAvailableInvestments();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
