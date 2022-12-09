import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsCatalogItemComponent } from './components/sports-catalog-item/sports-catalog-item.component';
import { SportsCatalogComponent } from './sports-catalog.component';
import { SportsCatalogItemDetailedViewComponent } from './components/sports-catalog-item-detailed-view/sports-catalog-item-detailed-view.component';
import { SportsCatalogRoutingModule } from './sports-catalog-routing.module';
import {MatChipsModule} from '@angular/material/chips';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SportsCatalogComponent,
    SportsCatalogItemComponent,
    SportsCatalogItemDetailedViewComponent
  ],
  imports: [
    CommonModule,
    SportsCatalogRoutingModule,
    NgbRatingModule,
    MatChipsModule
  ],
  exports: [
    SportsCatalogComponent
  ]
})
export class SportsCatalogModule { }
