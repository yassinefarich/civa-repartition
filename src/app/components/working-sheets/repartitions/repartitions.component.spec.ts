import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionsComponent } from './repartitions.component';

describe('GroupsComponent', () => {
  let component: RepartitionsComponent;
  let fixture: ComponentFixture<RepartitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepartitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
