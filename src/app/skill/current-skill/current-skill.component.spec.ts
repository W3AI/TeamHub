import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSkillComponent } from './current-skill.component';

describe('CurrentSkillComponent', () => {
  let component: CurrentSkillComponent;
  let fixture: ComponentFixture<CurrentSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
