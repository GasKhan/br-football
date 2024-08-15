import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicsListItemComponent } from './infographics-list-item.component';

describe('InfographicsListItemComponent', () => {
  let component: InfographicsListItemComponent;
  let fixture: ComponentFixture<InfographicsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfographicsListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfographicsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
