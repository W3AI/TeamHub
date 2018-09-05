import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SkillService } from '../skill.service';
import { Talent } from '../talent.model';
import { UIService } from '../../shared/ui.service';
import * as fromSkill from '../skill.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - Refactoring on Skill / Talent / Service

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  talents$: Observable<Talent[]>;
  // isLoading$: Observable<boolean>;

  constructor(
    private skillService: SkillService, 
    private uiService:  UIService, 
    private store: Store<fromSkill.State>    
  ) {}

  ngOnInit() {
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.plans$ = this.store.select(fromProject.getAvailablePlans);
    // this.fetchPlans();  
  }

  onAddSkill(form: NgForm) {
    this.skillService.addSkill( form.value );
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
}
