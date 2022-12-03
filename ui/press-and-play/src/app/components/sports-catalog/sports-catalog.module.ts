import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsCatalogItemComponent } from './components/sports-catalog-item/sports-catalog-item.component';
import { SportsCatalogComponent } from './sports-catalog.component';



@NgModule({
  declarations: [
    SportsCatalogComponent,
    SportsCatalogItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SportsCatalogComponent
  ]
})
export class SportsCatalogModule { }
