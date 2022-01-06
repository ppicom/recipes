import { Component, EventEmitter, Output } from '@angular/core';
import DataStorageService from '../shared/data-storage/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export default class HeaderComponent {
  constructor(private dataStorage: DataStorageService) {}

  onSave() {
    this.dataStorage.storeRecipes();
  }

  onFetch() {
    this.dataStorage.fetchRecipes();
  }
}
