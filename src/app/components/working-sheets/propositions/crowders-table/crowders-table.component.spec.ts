import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdersTableComponent } from './crowders-table.component';

describe('CrowdersTableComponent', () => {
  let component: CrowdersTableComponent;
  let fixture: ComponentFixture<CrowdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrowdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
