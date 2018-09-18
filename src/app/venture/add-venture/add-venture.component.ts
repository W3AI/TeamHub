import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Investment } from '../investment.model';
import { UIService } from '../../shared/ui.service';
import * as fromVenture from '../venture.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - Refactoring on Venture ~? Investment / Control

@Component({
  selector: 'app-add-venture',
  templateUrl: './add-venture.component.html',
  styleUrls: ['./add-venture.component.css']
})
export class AddVentureComponent implements OnInit {
  investments$: Observable<Investment[]>;
  panelOpenState = false;
  // isLoading$: Observable<boolean>;

  constructor(
    private ventureService: VentureService, 
    private uiService:  UIService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.investments$ = this.store.select(fromVenture.getAvailableInvestments);
    // this.fetchInvestments();  
  }

  onAddVenture(form: NgForm) {
    this.ventureService.addVenture( form.value );
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

}
