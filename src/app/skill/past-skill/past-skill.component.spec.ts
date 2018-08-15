import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSkillComponent } from './past-skill.component';

describe('PastSkillComponent', () => {
  let component: PastSkillComponent;
  let fixture: ComponentFixture<PastSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
