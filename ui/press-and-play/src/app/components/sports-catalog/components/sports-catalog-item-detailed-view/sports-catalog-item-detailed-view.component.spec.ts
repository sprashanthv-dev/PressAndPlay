import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsCatalogItemDetailedViewComponent } from './sports-catalog-item-detailed-view.component';

describe('SportsCatalogItemDetailedViewComponent', () => {
  let component: SportsCatalogItemDetailedViewComponent;
  let fixture: ComponentFixture<SportsCatalogItemDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsCatalogItemDetailedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsCatalogItemDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
