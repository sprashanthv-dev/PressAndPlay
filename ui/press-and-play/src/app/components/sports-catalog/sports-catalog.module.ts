import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsCatalogItemComponent } from './components/sports-catalog-item/sports-catalog-item.component';
import { SportsCatalogComponent } from './sports-catalog.component';
import { SportsCatalogItemDetailedViewComponent } from './components/sports-catalog-item-detailed-view/sports-catalog-item-detailed-view.component';
import { SportsCatalogRoutingModule } from './sports-catalog-routing.module';



@NgModule({
  declarations: [
    SportsCatalogComponent,
    SportsCatalogItemComponent,
    SportsCatalogItemDetailedViewComponent
  ],
  imports: [
    CommonModule,
    SportsCatalogRoutingModule
  ],
  exports: [
    SportsCatalogComponent
  ]
})
export class SportsCatalogModule { }
