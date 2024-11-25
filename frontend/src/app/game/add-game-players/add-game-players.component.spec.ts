import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGamePlayersComponent } from './add-game-players.component';

describe('AddGamePlayersComponent', () => {
  let component: AddGamePlayersComponent;
  let fixture: ComponentFixture<AddGamePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGamePlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGamePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
