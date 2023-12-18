import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishmanComponent } from './fishman.component';

describe('FishmanComponent', () => {
  let component: FishmanComponent;
  let fixture: ComponentFixture<FishmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishmanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FishmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
