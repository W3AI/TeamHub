import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Control } from '../control.model';
import { Plan } from "../../project/plan.model";
import { Talent } from "../../skill/talent.model";
import { UIService } from '../../shared/ui.service';
import * as fromVenture from '../venture.reducer';
import * as fromRoot from '../../app.reducer';
import { Investment } from '../investment.model';

// TODO - ? Refactor new-venture to launch or start TeamWork Combinations

@Component({
  selector: 'app-new-venture',
  templateUrl: './new-venture.component.html',
  styleUrls: ['./new-venture.component.css']
})
export class NewVentureComponent implements OnInit {
  investments$: Observable<Investment[]>
  controls$: Observable<Control[]>;
  projects$: Observable<Plan[]>;
  services$: Observable<Talent[]>;
  isLoading$: Observable<boolean>;

  cI: '';           // contextIni - startScript
  tL: '';           // testList   - checkScript
  iQ: '';           // inputquery
  tF: '';           // transformFunction
  uC: '';           // updateQuery
  searchResult: '';

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



  // TODO ? Cleanup - do we need all these fetches 
  // since we get everything in controls (Project data and service lists)?
  fetchControls() {
    this.ventureService.fetchAvailableControls(); 
  }

  fetchProjects() {
    this.ventureService.fetchAvailableProjects(); 
  }

  fetchServices() {
    this.ventureService.fetchAvailableServices(); 
  }

  fetchInvestments() {
    this.ventureService.fetchAvailableInvestments(); 
  }

  onStartVenture(form: NgForm) {
    this.ventureService.startControl( form.value.control );
  }

  // ToDo: Test Sanitizer / Angular Elements, etc 
  onSearchStep() {
    this.searchResult = eval( this.tF  );
  }

}
