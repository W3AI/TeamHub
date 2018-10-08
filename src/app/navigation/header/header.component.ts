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
  nTeams = [{langType: 'nLinks', langCode: 'en', lang:'en', nr: 514},
            {langType: 'nLinks', langCode: 'ro', lang:'ro', nr: 37},           
            {langType: 'nLinks', langCode: 'de', lang:'de', nr: 29},
            {langType: 'nLinks', langCode: 'hi', lang:'हिंदी', nr: 56},
            {langType: 'nLinks', langCode: 'fr', lang:'fr', nr: 25},
            {langType: 'nLinks', langCode: 'zh', lang:'中文', nr: 113},
            {langType: 'nLinks', langCode: 'es', lang:'es', nr: 32},
            {langType: 'nLinks', langCode: 'ar', lang:'عربى', nr: 24},
            {langType: 'nLinks', langCode: 'hu', lang:'hu', nr: 11},
            {langType: 'nLinks', langCode: 'ru', lang:'ru', nr: 28},
            {langType: 'nGenes', langCode: 'ag', lang:'agile', nr: 981},            
            {langType: 'nGenes', langCode: 'pm', lang:'pmi', nr: 32}, 
            {langType: 'nGenes', langCode: 'fi', lang:'fin', nr: 12}, 
            {langType: 'nGenes', langCode: 'js', lang:'js', nr: 55},
            {langType: 'nGenes', langCode: 'ts', lang:'ts', nr: 112}, 
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
