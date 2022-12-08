import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsCatalogItemDetailedViewComponent } from './components/sports-catalog-item-detailed-view/sports-catalog-item-detailed-view.component';
import { SportsCatalogComponent } from './sports-catalog.component';

const routes: Routes = [
  { path : "", redirectTo : "catalog", pathMatch: "full" },
  { path : "catalog", component : SportsCatalogComponent },
  { path : "catalog/:id", component : SportsCatalogItemDetailedViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsCatalogRoutingModule { 

}
