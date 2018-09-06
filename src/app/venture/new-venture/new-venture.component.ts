import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Control } from '../control.model';
import { UIService } from '../../shared/ui.service';
import * as fromVenture from '../venture.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-venture',
  templateUrl: './new-venture.component.html',
  styleUrls: ['./new-venture.component.css']
})
export class NewVentureComponent implements OnInit {
  controls$: Observable<Control[]>;
  isLoading$: Observable<boolean>;


  // the timer value - here 2000ms - should be used as the 
  // timeframe for waiting for a result - or eventually could be 
  // eg: 150% of the estimated time for the service response
  appStatus = new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve('stable');
    }, 2000);
  });
  contexts = [
    {
      instanceType: 'medium',
      name: 'Production',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Controling Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];

  contextIni = '';

  filteredStatus = '';

  getStatusClasses(context: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': context.status === 'stable',
      'list-group-item-warning': context.status === 'offline',
      'list-group-item-danger': context.status === 'critical'
    };
  }

  onAddContexts() {
    this.contexts.push({
      instanceType: 'small',
      name: 'New Context',
      status: 'stable',
      started: new Date(15, 1, 2017)
    });
  }


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
}
