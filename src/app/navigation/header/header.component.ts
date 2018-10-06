import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  user = {initials: 'SI', default: 'Me'};
  nTeams = [{langCode: 'en', lang:'en', teams: 514},
            {langCode: 'ro', lang:'ro', teams: 37},
            {langCode: 'de', lang:'de', teams: 9},
            {langCode: 'hi', lang:'हिंदी', teams: 6},
            {langCode: 'fr', lang:'fr', teams: 5},
            {langCode: 'zh', lang:'中文', teams: 3},
            {langCode: 'es', lang:'es', teams: 2},
            {langCode: 'ar', lang:'عربى', teams: 2},
            {langCode: 'hu', lang:'hu', teams: 2},
            {langCode: 'ru', lang:'ru', teams: 2}
          ];
  interval;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  onResume() {
    this.interval = setInterval(() => {

    }, 1000);
  }
}
