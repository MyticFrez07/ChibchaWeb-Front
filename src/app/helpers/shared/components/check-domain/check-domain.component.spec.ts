import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDomainComponent } from './check-domain.component';

describe('CheckDomainComponent', () => {
  let component: CheckDomainComponent;
  let fixture: ComponentFixture<CheckDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDomainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
