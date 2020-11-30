import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDeCrowdersComponent } from './table-de-crowders.component';

describe('CrowdersTableComponent', () => {
  let component: TableDeCrowdersComponent;
  let fixture: ComponentFixture<TableDeCrowdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDeCrowdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDeCrowdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
