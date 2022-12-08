import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PRESS_AND_PLAY_CONSTANTS } from 'src/app/constants/proj.cnst';
import { SportsCatalogItem } from 'src/app/models/sports-catalog-item';
import { DataService } from 'src/app/services/data.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sports-catalog-item',
  templateUrl: './sports-catalog-item.component.html',
  styleUrls: ['./sports-catalog-item.component.css']
})
export class SportsCatalogItemComponent implements OnInit {

  @Input() sportsCatalogItem : SportsCatalogItem = {};
  @Output() onCatalogItemSelected : EventEmitter<string> = new EventEmitter<string>();

  catalogItemConstants = PRESS_AND_PLAY_CONSTANTS.CATALOG_ITEM_CONSTANTS;

  constructor(
    private dataSrv : DataService,
    private utilSrv : UtilService) { }

  ngOnInit(): void {
    this.sportsCatalogItem = this.dataSrv.formatCatalogItem(
      this.sportsCatalogItem, this.catalogItemConstants.CATALOG_ITEM_CHAR_LIMIT);
  }

  handleCatalogItemSelection() {

    if (!this.utilSrv.isNullOrUndefined(this.sportsCatalogItem.id)) {
      this.onCatalogItemSelected.emit(this.sportsCatalogItem.id);
    }

  }

}
