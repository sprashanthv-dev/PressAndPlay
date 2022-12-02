import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsCatalogItemComponent } from './sports-catalog-item.component';

describe('SportsCatalogItemComponent', () => {
  let component: SportsCatalogItemComponent;
  let fixture: ComponentFixture<SportsCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsCatalogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
