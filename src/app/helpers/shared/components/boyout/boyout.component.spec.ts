import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoyoutComponent } from './boyout.component';

describe('BoyoutComponent', () => {
  let component: BoyoutComponent;
  let fixture: ComponentFixture<BoyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoyoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
