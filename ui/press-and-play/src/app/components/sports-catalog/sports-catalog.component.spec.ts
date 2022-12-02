import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsCatalogComponent } from './sports-catalog.component';

describe('SportsCatalogComponent', () => {
  let component: SportsCatalogComponent;
  let fixture: ComponentFixture<SportsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
