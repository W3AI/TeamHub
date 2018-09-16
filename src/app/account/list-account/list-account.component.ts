import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Bank } from '../bank.model';
import { AccountService } from '../account.service';
import * as fromAccount from '../account.reducer';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'number', 'description', 'url'];
  dataSource = new MatTableDataSource<Bank>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private accountService: AccountService, 
    private store: Store<fromAccount.State>
  ) {}

  ngOnInit() {
    this.store.select(fromAccount.getAvailableBanks).subscribe(
      (banks: Bank[]) => {
        this.dataSource.data = banks;
      }
    );
    this.accountService.fetchAvailableCards();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
