import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Relation } from '../relation.model';
import { FriendService } from '../friend.service';
import * as fromFriend from '../friend.reducer';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})
export class ListFriendComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'tags', 'description', 'url'];
  dataSource = new MatTableDataSource<Relation>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private friendService: FriendService, 
    private store: Store<fromFriend.State>
  ) {}

  ngOnInit() {
    this.store.select(fromFriend.getAvailableFriends).subscribe(
      (relations: Relation[]) => {
        this.dataSource.data = relations;
      }
    );
    this.friendService.fetchAvailableRelations();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
