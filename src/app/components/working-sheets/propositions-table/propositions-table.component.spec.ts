import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionsTableComponent } from './propositions-table.component';

describe('CrowdersTableComponent', () => {
  let component: PropositionsTableComponent;
  let fixture: ComponentFixture<PropositionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
