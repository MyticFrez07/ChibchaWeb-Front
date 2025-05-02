import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameserversComponent } from './nameservers.component';

describe('NameserversComponent', () => {
  let component: NameserversComponent;
  let fixture: ComponentFixture<NameserversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameserversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
