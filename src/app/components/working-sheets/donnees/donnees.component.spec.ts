import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneesComponent } from './donnees.component';

describe('DonneesComponent', () => {
  let component: DonneesComponent;
  let fixture: ComponentFixture<DonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
