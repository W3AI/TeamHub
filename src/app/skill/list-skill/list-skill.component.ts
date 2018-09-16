import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Talent } from '../talent.model';
import { SkillService } from '../skill.service';
import * as fromSkill from '../skill.reducer';

@Component({
  selector: 'app-list-skill',
  templateUrl: './list-skill.component.html',
  styleUrls: ['./list-skill.component.css']
})
export class ListSkillComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'tags', 'description', 'url'];
  dataSource = new MatTableDataSource<Talent>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private skillService: SkillService, 
    private store: Store<fromSkill.State>
  ) {}

  ngOnInit() {
    this.store.select(fromSkill.getAvailableTalents).subscribe(
      (talents: Talent[]) => {
        this.dataSource.data = talents;
      }
    );
    this.skillService.fetchAvailableTalents();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
