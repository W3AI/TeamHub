import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SkillService } from './skill.service';
import * as fromSkill from './skill.reducer';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  // TODO - Ongoing should be a list of Skills not just one
  ongoingSkill$: Observable<boolean>;

  constructor(private skillService: SkillService, private store: Store<fromSkill.State>) { }

  ngOnInit() {
    this.ongoingSkill$ = this.store.select(fromSkill.getIsSkill)
  }
}
