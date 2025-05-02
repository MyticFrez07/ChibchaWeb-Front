import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDomainComponent } from './item-domain.component';

describe('ItemDomainComponent', () => {
  let component: ItemDomainComponent;
  let fixture: ComponentFixture<ItemDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDomainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
