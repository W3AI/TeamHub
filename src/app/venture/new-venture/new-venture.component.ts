import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Test } from '../test.model';
import { UIService } from '../../shared/ui.service';
import * as fromVenture from '../venture.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-venture',
  templateUrl: './new-venture.component.html',
  styleUrls: ['./new-venture.component.css']
})
export class NewVentureComponent implements OnInit {
  tests$: Observable<Test[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private ventureService: VentureService, 
    private uiService:  UIService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.tests$ = this.store.select(fromVenture.getAvailableTests);
    this.fetchTests();   
  }

  // TODO ? - Change Test / Tests to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchTests() {
    this.ventureService.fetchAvailableTests(); 
  }

  onStartVenture(form: NgForm) {
    this.ventureService.startTest( form.value.test );
  }
}
