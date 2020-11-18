import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingSheetComponent } from './working-sheet.component';

describe('WorkingSheetComponent', () => {
  let component: WorkingSheetComponent;
  let fixture: ComponentFixture<WorkingSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
