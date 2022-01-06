import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import DataStorageService from '../shared/data-storage/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export default class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  userSubs: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe()
  }

  onSave() {
    this.dataStorage.storeRecipes();
  }

  onFetch() {
    this.dataStorage.fetchRecipes();
  }

  onLogout() {
    this.authService.logout()
  }
}
