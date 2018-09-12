import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Control } from '../control.model';
import { Plan } from "../../project/plan.model";
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

  project: Plan;

  cI: '';           // contextIni - startScript
  tL: '';           // testList   - checkScript
  iQ: '';           // inputquery
  tF: '';           // transformFunction
  uC: '';           // updateQuery
  searchResult: '';

    // console.log(this.contextIni);
    // console.log(this.testList);
    // console.log(this.inputQuery);
    // console.log(this.updateQuery);  
    // console.log( eval( this.transform ) );

  constructor(
    private ventureService: VentureService, 
    private uiService:  UIService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.fetchProject();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.controls$ = this.store.select(fromVenture.getAvailableControls);
    this.fetchControls();   
  }

  // TODO ? - Change Control / Controls to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchControls() {
    this.ventureService.fetchAvailableControls(); 
  }

  fetchProject(projectId: string = 'Vkz6btCEbWd5uEbo7s9D') {
    this.ventureService.fetchAvailableProjects(projectId); 
  }

  onStartVenture(form: NgForm) {
    this.ventureService.startControl( form.value.control );
  }

  // Here below are the elements of the DNA, RNA process/algo

  //  transform: 'Math.min( this.property1, this. property2)';
  // property1: number = 10;
  // property2: number = 99;

  // ToDo: Test Sanitizer / Angular Elements, etc 
  onSearchStep() {
    this.searchResult = eval( this.tF  );
    this.fetchProject();
  }

}
