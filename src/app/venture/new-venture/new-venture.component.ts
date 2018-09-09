import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Control } from '../control.model';
import { UIService } from '../../shared/ui.service';
import * as fromVenture from '../venture.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - ? Refactor new-venture to launch or start TeamWork Combinations

@Component({
  selector: 'app-new-venture',
  templateUrl: './new-venture.component.html',
  styleUrls: ['./new-venture.component.css']
})
export class NewVentureComponent implements OnInit {
  controls$: Observable<Control[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private ventureService: VentureService, 
    private uiService:  UIService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.controls$ = this.store.select(fromVenture.getAvailableControls);
    this.fetchControls();   
  }

  // TODO ? - Change Control / Controls to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchControls() {
    this.ventureService.fetchAvailableControls(); 
  }

  onStartVenture(form: NgForm) {
    this.ventureService.startControl( form.value.control );
  }

  // Here below are the elements of the DNA, RNA process/algo

  contextIni: '1';
  testList: '2';
  inputQuery: '3';
  transform: 'Math.min( this.property1, this. property2)';
  updateQuery: '4';
  searchResult: '';

  property1: number = 10;
  property2: number = 99;

  // ToDo: Test Sanitizer / Angular Elements, etc 
  onSearchStep() {
    // console.log(this.contextIni);
    // console.log(this.testList);
    // console.log(this.inputQuery);
    // console.log(this.updateQuery);  
    // console.log( eval( this.transform ) );

    this.searchResult = eval( this.transform  );
  }

}
