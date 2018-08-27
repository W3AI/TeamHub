import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SkillService } from '../skill.service';
import { Activity } from '../activity.model';
import { UIService } from '../../shared/ui.service';
import * as fromSkill from '../skill.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {
  activitys$: Observable<Activity[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private skillService: SkillService, 
    private uiService:  UIService, 
    private store: Store<fromSkill.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.activitys$ = this.store.select(fromSkill.getAvailableActivitys);
    this.fetchActivitys();   
  }

  // TODO ? - Change Task / Tasks to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchActivitys() {
    this.skillService.fetchAvailableActivitys(); 
  }

  onStartSkill(form: NgForm) {
    this.skillService.startActivity( form.value.activity );
  }
}
