import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicsListComponent } from './infographics-list.component';

describe('InfographicsListComponent', () => {
  let component: InfographicsListComponent;
  let fixture: ComponentFixture<InfographicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfographicsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfographicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
