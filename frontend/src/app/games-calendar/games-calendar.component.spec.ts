import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCalendarComponent } from './games-calendar.component';

describe('GamesCalendarComponent', () => {
  let component: GamesCalendarComponent;
  let fixture: ComponentFixture<GamesCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
