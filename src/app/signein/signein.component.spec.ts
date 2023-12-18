import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigneinComponent } from './signein.component';

describe('SigneinComponent', () => {
  let component: SigneinComponent;
  let fixture: ComponentFixture<SigneinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigneinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigneinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
