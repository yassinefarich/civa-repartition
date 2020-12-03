import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTempsComponent } from './gestion-temps.component';

describe('GestionTempsComponent', () => {
  let component: GestionTempsComponent;
  let fixture: ComponentFixture<GestionTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTempsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
