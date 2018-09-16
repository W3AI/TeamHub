import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from './venture.service';
import * as fromVenture from './venture.reducer';

@Component({
  selector: 'app-venture',
  templateUrl: './venture.component.html',
  styleUrls: ['./venture.component.css']
})
export class VentureComponent implements OnInit {

  // TODO - Ongoing should be a list of Ventures not just one
  ongoingVenture$: Observable<boolean>;

  constructor(private ventureService: VentureService, private store: Store<fromVenture.State>) { }

  ngOnInit() {
    this.ongoingVenture$ = this.store.select(fromVenture.getIsVenture)
  }
}
